{
  description = "charcoal.gg";

  inputs.nix-shells.url = "github:cecilia-sanare/nix-shells/main";

  outputs = { nix-shells, ... }:  {
    devShells = nix-shells.bun;
  };
}
