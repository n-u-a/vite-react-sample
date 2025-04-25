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
  it('renders label text passed via "name" prop', () => {
    render(<Button name="保存" />);

    // アクセシブルネームが "保存" のボタンが存在する
    expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
  });

  it('has default type="button"', () => {
    render(<Button name="Click me" />);
    const btn = screen.getByRole("button", { name: "Click me" });

    expect(btn).toHaveAttribute("type", "button");
  });

  it('honors explicit type="submit"', () => {
    render(<Button name="送信" type="submit" />);
    const btn = screen.getByRole("button", { name: "送信" });

    expect(btn).toHaveAttribute("type", "submit");
  });
});
