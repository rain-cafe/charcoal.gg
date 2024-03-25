{ ... }:

let
  nix-shells = builtins.getFlake "github:cecilia-sanare/nix-shells/main";
  shell = nix-shells.bun.${builtins.currentSystem}.default;
in
shell
