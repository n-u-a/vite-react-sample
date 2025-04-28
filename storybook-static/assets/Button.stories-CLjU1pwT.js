import{f as v,w as s,e,u as B}from"./index-nXYC881m.js";import{B as S}from"./Button-CIaTfJ1Q.js";import"./jsx-runtime-Cw0GR0a5.js";import"./index-CTjT7uj6.js";const L={title:"uiParts/Button",component:S,argTypes:{color:{control:"inline-radio",options:["primary","secondary"]},size:{control:"select",options:["small","medium","large","auto"]},type:{control:"radio",options:["button","submit"]},isLoading:{control:"boolean"}},args:{name:"Click",color:"primary",size:"auto",isLoading:!1,type:"button",onClick:v()},tags:["autodocs"]},a={name:"Primary",args:{color:"primary"},play:async({canvasElement:t})=>{const n=s(t),i=n.getByRole("button",{name:"Click"});e(i).not.toBeDisabled(),await B.click(i),e(n.getByRole("button")).toHaveAttribute("type","button")}},o={name:"Secondary",args:{color:"secondary",name:"Cancel"},play:async({canvasElement:t})=>{const n=s(t).getByRole("button",{name:"Cancel"});e(n).not.toBeDisabled()}},r={name:"Waiting",args:{isLoading:!0,name:"Saving…"},play:async({canvasElement:t})=>{const n=s(t).getByRole("button",{name:"Saving…"});e(n).toHaveAttribute("aria-disabled","true"),e(n).toHaveTextContent("Saving…")},parameters:{docs:{description:{story:"通信中などで非活性にしたい場合は `isLoading` を `true` にします。スタイルは ButtonTv の `isLoading` バリアントで制御します。"}}}};var c,l,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Primary",
  args: {
    color: "primary"
    // onClick は argTypes の action から自動で渡される
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", {
      name: "Click"
    });

    // 通常状態ならクリック可能で、disabled 属性はない
    expect(btn).not.toBeDisabled();

    // クリックシミュレーション → Action が呼ばれているか
    await userEvent.click(btn);
    expect(canvas.getByRole("button")).toHaveAttribute("type", "button");
    // Action タブ上で「clicked」が１回呼ばれたのを確認できる
  }
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,p,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Secondary",
  args: {
    color: "secondary",
    name: "Cancel"
  },
  play: async ({
    canvasElement
  }) => {
    const btn = within(canvasElement).getByRole("button", {
      name: "Cancel"
    });
    expect(btn).not.toBeDisabled();
  }
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var y,g,b;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Waiting",
  args: {
    isLoading: true,
    name: "Saving…"
  },
  play: async ({
    canvasElement
  }) => {
    const btn = within(canvasElement).getByRole("button", {
      name: "Saving…"
    });

    // ローディング中は aria-disabledがtrue のはず
    expect(btn).toHaveAttribute("aria-disabled", "true");
    // expect(btn).toBeDisabled();
    // 文言も確認しておく
    expect(btn).toHaveTextContent("Saving…");
  },
  parameters: {
    docs: {
      description: {
        story: "通信中などで非活性にしたい場合は \`isLoading\` を \`true\` にします。スタイルは ButtonTv の \`isLoading\` バリアントで制御します。"
      }
    }
  }
}`,...(b=(g=r.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};const R=["Primary","Secondary","Waiting"];export{a as Primary,o as Secondary,r as Waiting,R as __namedExportsOrder,L as default};
