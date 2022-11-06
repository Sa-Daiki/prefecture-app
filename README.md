
# prefecture-app

チェックした都道府県の人工構成比をグラフで表示することができる簡単なWebアプリです。


## 使用技術

 - [React](https://ja.reactjs.org/)
    - version18.2を使用。
 - [Next.js](https://nextjs.org/)
    - version13を使用。experimentalは未使用。
 - [TypeScript](https://www.typescriptlang.org/)
    - コードの安全性を高めたり、可読性を上げたりする目的で使用。
 - [ESLint](https://eslint.org/)
    - 有識者の方が作られたルールに則ることができるので、一定の品質が担保されると考えて使用。
    - [りあクト！ TypeScriptで始めるつらくないReact開発 第4版【② React基礎編】](https://booth.pm/ja/items/2368019)
        を参考に作成。
- [Prettier](https://prettier.io/)
    - ESLintでカバーできないフォーマットの部分統一を担当するために使用。
    - 上記同様、[りあクト！ TypeScriptで始めるつらくないReact開発 第4版【② React基礎編】](https://booth.pm/ja/items/2368019)
        を参考に作成。
- [StyleLint](https://stylelint.io/)
    - ESLintのCSS版です。
    - 上記同様、[りあクト！ TypeScriptで始めるつらくないReact開発 第4版【② React基礎編】](https://booth.pm/ja/items/2368019)
        を参考に作成。
- [ky](https://github.com/sindresorhus/ky)
    - fetchを使いやすくしてくれているライブラリです。
    - axiosはXMLHttpRequestを使用しているため、基本的に今後も不採用。
- [Tanstack Query](https://tanstack.com/query/v4)
    - [SWR](https://swr.vercel.app/ja)も選択肢にありましたが、前者の方が多機能で、その機能を使いたかったため、今回は不採用。
- [react-chartjs-2](https://react-chartjs-2.js.org/)
    - 他にも様々な選択肢がありましたが、渡すデータを比較的楽に作成できそうだったため、こちらを採用。
- [GitMoji](https://gitmoji.dev/)
    - Commitメッセージの意図を分かりやすくできます。
- [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)
    - Commitする前にコマンドを流したりできます。



## 開発

開発を行う場合

```
yarn dev // localhost:3000 で立ち上がります
```

本番の動作確認を行う場合

```
yarn build
yarn start // localhost:3000 で立ち上がります。

```

## 感想

Testの記述やリファクタリング、パフォーマンス向上など、やらなければならないことがまだまだ残ってしまている。また、Issueにあげたものでも解決できていないものがある。
だが、初めての経験が様々なある中で、アプリが動作する形にできたことはとても良かったと思う。
