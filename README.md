# 🎄 claude-christmas

Claude Code 터미널을 크리스마스 분위기로 꾸며 주는 모드입니다.

```
  ** ▄▄▄▄     *     *     +        .   ·         *.                .  ▄█▄
    █████▀●                  ·Merry Christmas!                      +▄●██▄
   ███████  ·                       *            *                * ▄██●██▄
   ▐▛███▜▌   *   *           & a happy new year           *        ▄█●██●██▄
  ▗▜█████▛▖ *                           .                         ▄●██●██●██▄
    ▘▘ ▝▝                             *   ·               *       ▄▄  ▐█▌  ▄▄
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
```

프롬프트 바로 위에 움직이는 장면이 생깁니다.

- **산타모자 쓴 Clawd**: 빨간 산타모자를 쓴 Clawd가 팔을 흔들고 가끔 눈을 깜빡여요.
- **장식된 트리**: 꼭대기 별이 반짝이고, 오너먼트 색이 계속 바뀌고, 트리 아래엔 선물 상자가 있어요.
- **내리는 눈**: 눈송이가 바람에 흔들리며 쌓인 눈 위로 떨어져요.
- **크리스마스 문구**: Claude가 작업할 때 뜨는 줄이 "Decking the halls…", "Wrapping presents…"처럼 바뀌고, 턴이 끝날 때 줄은 "Gift-wrapped for 3s"처럼 바뀌어요.

## 사용법

### 준비물

- [Claude Code](https://claude.com/claude-code) (터미널 버전, 2.1.326 이상에서 확인)
- 별도 계정이나 설정은 필요 없어요. 공개 저장소라 누구나 설치할 수 있습니다.

### 1. 설치하기

**방법 A. Claude Code 안에서 (가장 쉬움)**

Claude Code를 실행하고 프롬프트에 아래 한 줄을 입력하세요.

```
/plugin install christmas --marketplace wpalswpa/claude-christmas
```

1. `Add marketplace?` 라고 물으면 `y`
2. 설치 범위를 고르는 화면에서 그대로 Enter (user 범위, 모든 세션에 적용)
3. `Installed christmas. Plugin is now active.` 가 뜨면 끝! 재시작 없이 바로 적용돼요.

**방법 B. 터미널(셸)에서**

```
claude plugin install christmas --marketplace wpalswpa/claude-christmas
```

설치 후 Claude Code를 새로 실행하면 적용돼요.

**방법 C. 직접 내려받아서 쓰기**

설치하지 않고 한 번만 써 보고 싶다면:

```
git clone https://github.com/wpalswpa/claude-christmas.git
claude --plugin-dir ./claude-christmas
```

이렇게 실행한 세션에서만 적용됩니다.

**데스크톱 앱**에서는 `/plugin`이 동작하지 않으니, 프롬프트 입력창 옆 **+** → **Plugins** → **Add marketplace**에 `wpalswpa/claude-christmas` 입력 → **Add plugin** 순서로 설치하세요. (눈 내리는 장면은 터미널에서만 보여요.)

### 2. 확인하기

설치되면 프롬프트 입력창 바로 위에 산타모자 쓴 Clawd, 트리, 내리는 눈이 나타나요. 메시지를 보내면 작업 중 문구도 크리스마스 버전으로 바뀝니다.

안 보인다면:

- 터미널 창이 너무 좁지 않은지 확인하세요 (가로 24칸 이상 필요, 80칸 이상이면 인사말까지 보여요).
- 장면이 접혀 있을 수 있어요. `ctrl+x ctrl+a`로 펼치세요.
- `claude plugin list`에 `christmas`가 있는지 확인하세요.

### 3. 접기 / 끄기 / 지우기

| 하고 싶은 것 | 방법 |
| --- | --- |
| 장면 잠깐 접기·펼치기 | `ctrl+x ctrl+a` |
| 잠시 끄기 | `claude plugin disable christmas@claude-christmas` |
| 다시 켜기 | `claude plugin enable christmas@claude-christmas` |
| 최신 버전으로 업데이트 | `claude plugin update christmas@claude-christmas` |
| 완전히 지우기 | `claude plugin uninstall christmas@claude-christmas` |

Claude Code 안에서는 `/plugin`을 입력해 메뉴에서 똑같이 관리할 수 있어요.

## 포크해서 내 것으로 만들기

이 저장소는 그 자체가 마켓플레이스입니다(`.claude-plugin/marketplace.json`이 `./`를 가리켜요). 그래서 포크하면 따로 설정할 것 없이 바로 쓸 수 있어요.

1. GitHub에서 이 저장소를 포크합니다.
2. `hooks/register.tsx`에서 원하는 대로 바꿉니다. 인사말(`'Merry Christmas!'`), 색상, 작업 중 문구(`SPINNER_WORDS`), 장면 높이(`ROWS`) 등.
3. `<내 GitHub 이름>` 자리에 본인 계정 이름을 넣어 설치합니다.

   ```
   /plugin install christmas --marketplace <내 GitHub 이름>/claude-christmas
   ```

   다른 사람도 같은 줄로 내 버전을 설치할 수 있어요.

푸시하기 전에 로컬에서 먼저 확인하려면 `claude --plugin-dir /path/to/claude-christmas`로 실행하세요.

## 라이선스

MIT
