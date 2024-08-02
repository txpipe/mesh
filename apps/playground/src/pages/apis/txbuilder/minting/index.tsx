import type { NextPage } from "next";

import SidebarFullwidth from "~/components/layouts/sidebar-fullwidth";
import TitleIconDescriptionBody from "~/components/sections/title-icon-description-body";
import Metatags from "~/components/site/metatags";
import { metaTxbuilderMinting } from "~/data/links-txbuilders";
import TxbuilderBurningOneSignature from "./burning-one-signature";
import TxbuilderMintingCip68 from "./minting-cip68";
import TxbuilderMintingNativeScript from "./minting-native-script";
import TxbuilderMintAsset from "./minting-one-signature";
import TxbuilderMintingPlutusScript from "./minting-plutus-script";

const ReactPage: NextPage = () => {
  const sidebarItems = [
    { label: "Mint with One Signature", to: "mintingOneSignature" },
    { label: "Burn asset", to: "burningOneSignature" },
    { label: "Mint with Native Script", to: "mintingNativeScript" },
    { label: "Mint with Plutus Script", to: "mintingPlutusScript" },
    { label: "Mint with CIP-68", to: "mintingCip68" },
    { label: "Mint Royalty Token", to: "mintingRoyaltyToken" },
  ];

  return (
    <>
      <Metatags
        title={metaTxbuilderMinting.title}
        description={metaTxbuilderMinting.desc}
      />
      <SidebarFullwidth sidebarItems={sidebarItems}>
        <TitleIconDescriptionBody
          title={metaTxbuilderMinting.title}
          description={metaTxbuilderMinting.desc}
          heroicon={metaTxbuilderMinting.icon}
        >
          <>
            <p></p>
          </>
        </TitleIconDescriptionBody>

        <TxbuilderMintAsset />
        <TxbuilderBurningOneSignature />
        <TxbuilderMintingNativeScript />
        <TxbuilderMintingPlutusScript />
        <TxbuilderMintingCip68 />
      </SidebarFullwidth>
    </>
  );
};

export default ReactPage;
