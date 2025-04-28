import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as t}from"./index-DSkyVWTJ.js";import{M as i,C as e,S as d}from"./index-DFqhG5s4.js";import{S as c,W as l,A as x,a as j,b as o}from"./Search.stories-ZJ7FUMQ_.js";import"./index-CTjT7uj6.js";import"./iframe-D9KJo7fW.js";import"./index-DwHHXP4W.js";import"./index-bQJQ23L7.js";import"./index-DrFu-skq.js";import"./Button-CIaTfJ1Q.js";import"./index-DCUQYpzu.js";import"./index-nXYC881m.js";function h(n){const s={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...n.components};return r.jsxs(r.Fragment,{children:[r.jsx(i,{of:c,title:"Pages/Search States/WithResult"}),`
`,r.jsx(s.h1,{id:"searchコンポーネント",children:"Searchコンポーネント"}),`
`,r.jsxs(s.p,{children:[r.jsx(s.code,{children:"Search"})," は商品検索画面コンポーネントです。",r.jsx(s.br,{}),`
`,"検索条件を入力して検索をすることで、条件に一致する商品情報を表示します。"]}),`
`,r.jsx(e,{of:l}),`
`,r.jsx(s.h2,{id:"項目一覧",children:"項目一覧"}),`
`,r.jsxs(s.table,{children:[r.jsx(s.thead,{children:r.jsxs(s.tr,{children:[r.jsx(s.th,{children:"項目 ID"}),r.jsx(s.th,{children:"項目名"}),r.jsx(s.th,{children:"オブジェクト"})]})}),r.jsxs(s.tbody,{children:[r.jsxs(s.tr,{children:[r.jsx(s.td,{children:"F001"}),r.jsx(s.td,{children:"検索条件入力欄"}),r.jsx(s.td,{children:r.jsx(d,{of:x})})]}),r.jsxs(s.tr,{children:[r.jsx(s.td,{children:"F002"}),r.jsx(s.td,{children:"検索ボタン"}),r.jsx(s.td,{children:r.jsx(d,{of:j})})]}),r.jsxs(s.tr,{children:[r.jsx(s.td,{children:"F003"}),r.jsx(s.td,{children:"削除ダイアログ"}),r.jsx(s.td,{children:r.jsx(e,{of:o,className:"block w-[760px]"})})]})]})]}),`
`,r.jsx(s.h2,{id:"項目詳細",children:"■項目詳細"}),`
`,r.jsx(s.h3,{id:"f001検索条件入力欄",children:"・F001【検索条件入力欄】"}),`
`,r.jsx(s.hr,{}),`
`,r.jsx(s.p,{children:"下記検索条件を入力可能。"}),`
`,r.jsxs(s.ul,{children:[`
`,r.jsx(s.li,{children:"商品コード"}),`
`,r.jsx(s.li,{children:"商品名"}),`
`,r.jsx(s.li,{children:"商品区分"}),`
`,r.jsx(s.li,{children:"不足製品フラグ"}),`
`]}),`
`,r.jsxs(s.p,{children:[r.jsx(s.strong,{children:"バリデーション"}),r.jsx(s.br,{}),`
`,"F002(検索ボタン)押下時に検索条件が1つ以上入力されていない場合、「※ 検索条件は1項目以上入力してください。」というエラーメッセージを表示する。"]}),`
`,r.jsx(s.h2,{id:"アクション詳細",children:"■アクション詳細"}),`
`,r.jsx(s.h3,{id:"f002検索ボタンクリック",children:"・F002【検索ボタン】クリック"}),`
`,r.jsx(s.hr,{}),`
`,r.jsxs(s.p,{children:["1.F002(検索ボタン)押下時、F001(検索条件入力欄)のバリデーションを実施する。",r.jsx("br",{}),`\r
2.バリデーション結果に応じた処理を行う。`,r.jsx("br",{}),`\r
　2-1.バリデーションエラーが発生した場合、エラーメッセージを表示して処理を終了する。`,r.jsx("br",{}),`\r
　2-2.バリデーションエラーが発生しない場合、「3.」の処理を実施する。`,r.jsx("br",{}),`\r
3.API-01(商品検索)を実行し、取得結果を画面に表示する。`]}),`
`,r.jsx(s.p,{children:r.jsx(s.strong,{children:"API-01 parameters"})}),`
`,r.jsxs(s.table,{children:[r.jsx(s.thead,{children:r.jsxs(s.tr,{children:[r.jsx(s.th,{children:"property"}),r.jsx(s.th,{children:"設定値"})]})}),r.jsxs(s.tbody,{children:[r.jsxs(s.tr,{children:[r.jsx(s.td,{children:"product_code"}),r.jsx(s.td,{children:"F001(検索条件入力欄)の商品コード"})]}),r.jsxs(s.tr,{children:[r.jsx(s.td,{children:"product_name"}),r.jsx(s.td,{children:"F001(検索条件入力欄)の商品名"})]}),r.jsxs(s.tr,{children:[r.jsx(s.td,{children:"product_classification"}),r.jsx(s.td,{children:"F001(検索条件入力欄)の商品区分"})]}),r.jsxs(s.tr,{children:[r.jsx(s.td,{children:"is_short_stock_only"}),r.jsx(s.td,{children:"F001(検索条件入力欄)の不足製品フラグ"})]})]})]}),`
`,r.jsx(s.h1,{id:"状態別画面表示",children:"状態別画面表示"}),`
`,r.jsx(s.hr,{}),`
`,r.jsxs(s.ul,{children:[`
`,r.jsx(s.li,{children:r.jsx(s.a,{href:"?path=/docs/pages-search--searchdefault",children:"検索前"})}),`
`,r.jsx(s.li,{children:r.jsx(s.a,{href:"?path=/docs/pages-search--searchloading",children:"ローディング中"})}),`
`,r.jsx(s.li,{children:r.jsx(s.a,{href:"?path=/docs/pages-search--searchvalidationerror",children:"バリデーションエラー"})}),`
`]})]})}function C(n={}){const{wrapper:s}={...t(),...n.components};return s?r.jsx(s,{...n,children:r.jsx(h,{...n})}):h(n)}export{C as default};
