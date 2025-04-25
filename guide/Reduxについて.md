# Reduxについて

Reduxは、アプリケーション全体の「状態」を一元管理するための仕組みです。  
簡単に言うと、アプリ内のデータを整理して保存しておき、どこからでも簡単に使えるようにする箱（ストア）を提供するツールです。

## store.ts

Redux Toolkitを使ってアプリケーション全体の状態管理の基盤を作成している部分です。

```typescript
// 各リデューサーを初期化
const rootReducer = combineReducers({
  search: searchReducer,
});

// RootState 型を定義
export type RootState = ReturnType<typeof rootReducer>;

// storeの初期化
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
```

### combineReducersで複数の状態を統合する

```typescript
// 各リデューサーを初期化
const rootReducer = combineReducers({
  search: searchReducer,
});
```

- `combineReducers`はReduxの関数で、複数のリデューサー（状態の変更を担当する関数）を1つにまとめる役割を持っています。
- `searchReducer`は、検索機能の状態を管理するリデューサーです。
- `rootReducer`は「アプリ全体の状態を管理するリデューサー」になります。`combineReducers`で複数のリデューサーを1つにまとめたものになります。

### RootState型の定義

```typescript
// RootState 型を定義
export type RootState = ReturnType<typeof rootReducer>;
```

`RootState`はアプリ全体の状態の型を表します。  
ReturnType<typeof rootReducer>を使うことで、rootReducerが返す値（アプリ全体の状態）から型を自動生成します。

TypeScriptを使って、アプリ内で「状態の型」を安全に扱うために使用します。

### Reduxストアの初期化

```typescript
// 各リデューサーを初期化
export const store = configureStore({
  reducer: rootReducer,
});
```

- configureStore
  - Redux Toolkitの関数で、Reduxストアを簡単に作成します。内部でcreateStoreやミドルウェアの設定が行われます。
  - デフォルトでredux-thunk（非同期処理を扱うミドルウェア）が含まれています。

ストアはアプリ全体のデータを保存する「箱」のようなものです。  
ここに保存されたデータは、どのコンポーネントからでもアクセス・更新が可能です。

### AppDispatch型の定義

```typescript
export type AppDispatch = typeof store.dispatch;
```

Reduxストアの`dispatch`メソッド（アクションをストアに送るための関数）の型を定義しています。  
今回の例では`redux-toolkit`を使ってReduxを使用しているためアクションという概念はあまり意識することはありません。

## SearchReducer

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store"; // storeで定義したものをimportする。
import { SearchCondition } from "../../../apis/dto/SearchCondition";

type SearchState = {
  condition: SearchCondition | null;
};

// 初期状態
const initialState: SearchState = {
  condition: null,
};

// 検索条件を管理するスライス
const search = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    // 検索条件の更新
    setCondition: (state, action: PayloadAction<SearchCondition>) => {
      state.condition = action.payload;
    },
    // 検索条件のリセット
    resetCondition: (state) => {
      state.condition = null;
    },
  },
});

// Actions
export const { setCondition, resetCondition } = search.actions;

// Selector
export const selectCondition = (state: RootState) => state.search.condition;

// Reducer
export default search.reducer;
```

### createSliceでスライスの作成

`createSlice`はRedux Toolkitの機能で、リデューサーとアクションを簡潔に定義する方法です。  
スライスとは、特定の機能や状態（この場合は「検索条件」）を管理する1つの部分を指します。

- `name`はスライスの名前で、アクションタイプ（例: search/setCondition）のプレフィックスになります。
- 状態の初期値を定義します。このスライスではinitialStateという変数が外部で定義されていると仮定しています。

```typescript
const search = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    // 検索条件の更新
    setCondition: (state, action: PayloadAction<SearchCondition>) => {
      state.condition = action.payload;
    },
    // 検索条件のリセット
    resetCondition: (state) => {
      state.condition = null;
    },
  },
});
```

### アクションのエクスポート

`search.actions`は、`createSlice`が自動生成するアクションです。   
`reducers`に定義したリデューサーに対応するアクションが自動的に生成されます。  

```typescript
export const { setCondition, resetCondition } = search.actions;
```

アクションは、`dispatch`を使ってストアに送信されます。
```typescript
dispatch(setCondition({ key: "value" })); // 検索条件を更新
dispatch(resetCondition()); // 検索条件をリセット
```

### セレクターの定義

セレクターとは、ストアで管理している状態から特定の部分を取得するための関数です。  
`selectCondition`はアプリ全体の状態（RootState）からsearch.conditionを取得する関数です。

```typescript
export const selectCondition = (state: RootState) => state.search.condition;
```

各ReactコンポーネントでuseSelectorを使って状態を取得できます。

```typescript
const condition = useSelector(selectCondition);
```

## 動作の全体像

### 1.状態の初期値

initialStateが初期状態として設定されます。

### 2.アクションのディスパッチ

アクション（`setCondition`や`resetCondition`）がディスパッチされると、対応するリデューサーが実行されて状態が更新されます。

### 3.状態の取得

セレクター（`selectCondition`）を使って状態を取得できます。

## 実装の利用例

### 検索条件を設定する

```typescript
dispatch(setCondition({ keyword: "Redux Toolkit", page: 1 }));
```

### 検索条件をリセットする

```typescript
dispatch(resetCondition());
```

### 現在の検索条件を取得する

```typescript
const condition = useSelector(selectCondition);
console.log(condition); // 現在の検索条件が出力される
```

## 補足

Reduxは機能的に過剰である場合も多く、学習コストも高いと言われています。  
代替の状態管理ライブラリとしては、Jotai, zustandなどが挙げられます。  
recoilはReact 19からは使えなくなり、今後開発予定がないそうなので利用は避けた方がよさそうです。

[npm trends](https://npmtrends.com/jotai-vs-react-redux-vs-recoil-vs-redux-vs-zustand)を見るとzustandが伸びてきていることがわかりますが、Reduxと同じstoreベースの状態管理ライブラリであり学習コストが高いようです。  
recoilがReact 19から非対応になったことからrecoil同様のatomベースの状態管理ライブラリであるjotaiの採用が今後増える可能性あります。

参考：[Reactの状態管理ライブラリ「Jotai」を採用した背景](https://www.ecomottblog.com/?p=12768)