/**
 * Button コンポーネントのスモークテスト
 * - ラベル（name）が表示される
 * - `type` のデフォルトは "button"
 * - `type="submit"` を渡すと属性が変わる
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "@components/uiParts/button/Button";

describe("<Button />", () => {
  it('"name" propに指定した値でボタンのラベルがレンダリングされることを確認する', () => {
    render(<Button name="保存" />);

    // "保存" のボタンが存在する
    expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
  });

  it('type="button"のAttributeを持っていることを確認する', () => {
    render(<Button name="Click me" />);
    const btn = screen.getByRole("button", { name: "Click me" });

    expect(btn).toHaveAttribute("type", "button");
  });

  it('type="submit"のAttributeを持っていることを確認する', () => {
    render(<Button name="送信" type="submit" />);
    const btn = screen.getByRole("button", { name: "送信" });

    expect(btn).toHaveAttribute("type", "submit");
  });
});
