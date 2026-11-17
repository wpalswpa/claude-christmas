# 🎄 claude-christmas

A Christmas mod for the Claude Code terminal.

```
  ** ▄▄▄▄     *     *     +        .   ·         *.                .  ▄█▄
    █████▀●                  ·Merry Christmas!                      +▄●██▄
   ███████  ·                       *            *                * ▄██●██▄
   ▐▛███▜▌   *   *           & a happy new year           *        ▄█●██●██▄
  ▗▜█████▛▖ *                           .                         ▄●██●██●██▄
    ▘▘ ▝▝                             *   ·               *       ▄▄  ▐█▌  ▄▄
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
```

It adds an animated band above the prompt:

- **Santa-hat Clawd**: Clawd wears a red Santa hat, waves and blinks now and then.
- **A decorated tree**: the star twinkles, the ornaments change color, and there are presents under it.
- **Falling snow**: flakes drift down across the band onto snowy ground.
- **Christmas words**: the line that shows while Claude works reads "Decking the halls…" or "Wrapping presents…", and the closing line of each turn reads "Gift-wrapped for 3s".

Press `ctrl+x ctrl+a` to fold the band away.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install christmas --marketplace wpalswpa/claude-christmas
```

Answer `y` to add the marketplace, then press Enter to pick the user scope. It's active right away.

From a shell:

```
claude plugin install christmas --marketplace wpalswpa/claude-christmas
```

In the desktop app, where `/plugin` doesn't run: click **+** next to the prompt box, then **Plugins**, then **Add marketplace** with `wpalswpa/claude-christmas`, then **Add plugin**.

## Fork it and make it yours

The repository is its own marketplace (`.claude-plugin/marketplace.json` points at `./`), so a fork works with no setup:

1. Fork this repository on GitHub.
2. Change whatever you like in `hooks/register.tsx`: the greeting (`'Merry Christmas!'`), the colors, `SPINNER_WORDS`, or the band's height (`ROWS`).
3. Install your fork, with your GitHub name in place of `<you>`:

   ```
   /plugin install christmas --marketplace <you>/claude-christmas
   ```

   Anyone else can install your version with the same line.

To try changes locally before you push, run `claude --plugin-dir /path/to/claude-christmas`.

## License

MIT
