# Amazon Q pre block. 
[[ -f "${HOME}/Library/Application Support/amazon-q/shell/zshrc.pre.zsh" ]] && builtin source "${HOME}/Library/Application Support/amazon-q/shell/zshrc.pre.zsh"

ZSH_THEME=robbyrussell export ZSH="$HOME/.oh-my-zsh"

plugins=(git)

source $ZSH/oh-my-zsh.sh

source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh 
source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh

alias p="pnpm"
