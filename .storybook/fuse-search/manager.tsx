import React, { useEffect, useState } from "react";
import { addons, types } from "@storybook/manager-api";

import { IconButton } from "@storybook/components";
import { SearchIcon } from "@storybook/icons";
import Fuse from "fuse.js";

interface Hit {
  id: string; // story id (ページ遷移用)
  name: string; // ページタイトル
  content: string; // 本文 (MDX をプレーン化)
}

const PANEL_ID = "fuse-search/addon";

const SearchButton: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [fuse, setFuse] = useState<Fuse<Hit>>();

  /* 1) addon-index.json をロードして Fuse インスタンスを準備 */
  useEffect(() => {
    fetch("addon-index.json")
      .then((r) => r.json())
      .then((json) => {
        // addon-index.json format: { entries: { [storyId]: { name, tags, title, text } } }
        const docs = Object.entries<any>(json.entries).map(([id, { name, title, text }]) => ({
          id,
          name: title ?? name,
          content: text ?? "",
        }));
        setFuse(
          new Fuse(docs, {
            includeScore: true,
            keys: ["name", "content"],
            threshold: 0.3,
          })
        );
      });
  }, []);

  /* 2) 検索クエリが変わったら Fuse で検索 */
  useEffect(() => {
    if (!fuse || !query) return setHits([]);
    const res = fuse
      .search(query)
      .slice(0, 20)
      .map((r) => r.item);
    setHits(res);
  }, [query, fuse]);

  /* 3) 検索結果クリックでナビゲーション */
  const goto = (id: string) => {
    window.parent?.location.replace(`?path=/docs/${id}--docs`);
    setOpen(false);
  };

  return (
    <>
      <IconButton key="fuse-search-button" title="Search Docs" onClick={() => setOpen((v) => !v)} active={open}>
        <SearchIcon />
      </IconButton>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.3)",
            zIndex: 9999,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              maxWidth: "90%",
              background: "#fff",
              padding: 24,
              borderRadius: 8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              placeholder="Search docs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                fontSize: 16,
                marginBottom: 12,
              }}
            />

            <ul style={{ maxHeight: 400, overflow: "auto" }}>
              {hits.map((h) => (
                <li key={h.id} style={{ padding: "6px 4px", cursor: "pointer" }} onClick={() => goto(h.id)}>
                  <strong>{h.name}</strong>
                  <br />
                  <span style={{ fontSize: 12, color: "#666" }}>{h.content.slice(0, 80).replace(/\s+/g, " ")}…</span>
                </li>
              ))}
              {query && hits.length === 0 && <li style={{ color: "#999" }}>No results</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

/* 4) アドオンを Manager API に登録 */
addons.register("fuse-search", () => {
  addons.add(PANEL_ID, {
    type: types.TOOL,
    title: "Fuse Search",
    match: () => true,
    render: () => <SearchButton />,
  });
});
