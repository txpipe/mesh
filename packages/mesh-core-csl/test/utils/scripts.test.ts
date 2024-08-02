import { applyParamsToScript, getV2ScriptHash } from "../../src";

describe("Scripts", () => {
  test("getV2ScriptHash", () => {
    const scriptCbor =
      "5902130100003332323232323232323223222232533300932323232533300d3370e9000180600089919191919191919191919299980d980f0010991919299980d99b874800000454ccc06cc8cc004004030894ccc08000452809919299980f99baf3024301d00201a14a2266008008002604800460440022a66603666e1c009200213371e00602e29405854ccc06ccdc380124002266e3c00c05c528180c80a1bad301b002375c60320022c6038002646464a66603266e1d200200114bd6f7b63009bab301e30170023017001323300100100222533301c00114c103d87a8000132323232533301d3371e01e004266e95200033021374c00297ae01330060060033756603c0066eb8c070008c080008c078004c8cc004004008894ccc06c00452f5bded8c0264646464a66603866e3d221000021003133020337606ea4008dd3000998030030019bab301d003375c6036004603e004603a0026eacc068004c068004c064004c060004c05c008dd6180a80098068029bae3013001300b0011630110013011002300f001300700214984d958c94ccc024cdc3a40000022a666018600e0062930b0a99980499b874800800454ccc030c01c00c52616163007002375c0024600a6ea80048c00cdd5000ab9a5573aaae7955cfaba05742ae8930010544666f6f64004c012bd8799fd8799f58201b62387919a52907670edca0942af3fe5128eccd075d497ad56e62ee0d402867ff03ff0001";
    const expectedHash =
      "f4b22e1d689db1a060e8f7fb9c22fad4e0437efe0cd993549bbc46dc";
    expect(getV2ScriptHash(scriptCbor)).toBe(expectedHash);
  });
  test("getV2ScriptHash 2", () => {
    const scriptCbor =
      "5902130100003332323232323232323223222232533300932323232533300d3370e9000180600089919191919191919191919299980d980f0010991919299980d99b874800000454ccc06cc8cc004004030894ccc08000452809919299980f99baf3024301d00201a14a2266008008002604800460440022a66603666e1c009200213371e00602e29405854ccc06ccdc380124002266e3c00c05c528180c80a1bad301b002375c60320022c6038002646464a66603266e1d200200114bd6f7b63009bab301e30170023017001323300100100222533301c00114c103d87a8000132323232533301d3371e01e004266e95200033021374c00297ae01330060060033756603c0066eb8c070008c080008c078004c8cc004004008894ccc06c00452f5bded8c0264646464a66603866e3d221000021003133020337606ea4008dd3000998030030019bab301d003375c6036004603e004603a0026eacc068004c068004c064004c060004c05c008dd6180a80098068029bae3013001300b0011630110013011002300f001300700214984d958c94ccc024cdc3a40000022a666018600e0062930b0a99980499b874800800454ccc030c01c00c52616163007002375c0024600a6ea80048c00cdd5000ab9a5573aaae7955cfaba05742ae8930010544666f6f64004c012bd8799fd8799f58201b62387919a52907670edca0942af3fe5128eccd075d497ad56e62ee0d402867ff03ff0001";
    const expectedHash =
      "b3676ddb7727f513866a43f54caa2f3123751d317bf7cde17ebc68ed";
    expect(getV2ScriptHash(applyParamsToScript(scriptCbor, []))).toBe(
      expectedHash,
    );
  });
  test("getV2ScriptHash 3", () => {
    const scriptCbor =
      "590b4c01000032323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323222323232323232325335350032235002222223222222223350132333553041042302502623300a0014800400494ccd5cd19b8733022304104233304f22253350011002221350022233007333305622225335001100222135002225333573460ac002266601000e00c006266601000e6609e66608600e00400200c00600400c00200607e01466e08cc088c1041080052004153353335530410423025023302148811c467f295621e8d6a12838376a8fbca08c15ec6a95d245075809d03faa003355303d0422350010443501022222222222233355304d04e3303f223355304b05023500122330440023355304e0532350012233047002333500137009000380233700002900000099aa982582811a8009119822001199a800919aa982782a11a8009119824001181a0008009119981881a001000919aa982782a11a8009119824001181a80080099981601780100082591a800911a80090210060999aa9820821181281311a8009191911299a999aa982382418158149299a9980c1a800901d28028a99aa999a9a800911100102010999ab9a3375e00260a666ae80d400c88c154cd5d0181200119aba0533500121305633574066a002460ae66ae80c098004dd8814111182d19aba0375000666ae80dd400119aba037500026ec40a8dd88138982b1bb1026376204c66ae80dd480219aba04c10100003357406ea54068dd881202382110208998121a80091110021981d0911800a4411cbe2740601593f3049a0f55d35fd88cebcb1ee691b4d808e9a3ad839c0030223022302248811c0de79fa8718d6f7b1125e5a5d3244cc9c9a26e3b8b3eeb385c92d9930004004001215335333553047048302b029253353301835001203a5004133024350012222004002040012153353300f5004480084cc03d400d200203f03f03f1337149110332323200002133714911033130300000100103903922333573466e1cccc08000d402c0080040e00cc4480045888ccd5cd181c99980c001280180081801589a800911999a80081b100081b01b2999ab9a3034303b00413232321233001003002301d357426ae88c0f00194ccd5cd181a981e000899191919191919191919191919191919191919191919190919999999999980080c00b00a009008007006004803802801801181a9aba135744004666060eb88004d5d08009aba200233302e02f2001357420026ae88008cc0e9d71aba100135744006a666ae68c110c12c0044c8c8c8c848cc0040100094ccd5cd1823982700089919091980080180118149aba135744609c00466052eb4d5d098268008229baa357426ae88c13000d4ccd5cd1822982600089919091980080180118139aba13574460980046604eeb4d5d098258008219baa3574260940020846ea8d5d08009aba200233302703075a6ae84004d5d1001198198139aba100135744004666046eb8088d5d08009aba200233302175c0406ae84004d5d10011981680e9aba100135744004660560346ae84004d5d1181e0011981480c1aba1303b00103337546ae84c0e80100c94ccd5cd181a000899091180100199813bae3574260720042a666ae68c0cc0044c8488c00400ccc09c8c94ccd5cd181a981e0008991998119bae3574260780046eb8d5d080098121aba1357440026ae88c0ec0040ccdd50009aba13039002031303900137540066ea80048cd40048c0cccd5d01ba900137620084606866ae80dd48009bb10042122300200349888d400888d400c88c8cd40148cd401094ccd5cd19b8f00200100302520262335004202625333573466e3c00800400c09454cd400c854cd400884cd40088cd40088cd40088cd40088cc04000800480a48cd400880a48cc0400080048880a4888cd401080a48894ccd5cd19b8700600315333573466e1c0140084ccd5cd19b8700400103002b02a02a02315335001202302722233355302102702533553022027235001223301b0023007001333553021027223500222533533355302a02b300e00c235001223300a002005006100313302900400302400133553022027235001223301b002330372253350011300a003221350022253353300c002008112223300200a0041300600300400221222300300421222300100422333573466e3c00800408006c88cccd54008cc04c88ccd4018094004008d401009088cdc0000a40040029000091980091299a80100f080080c1980791118019801000900091980791199a8018108010009a800810091980091299a801080080b00d111198159119a800a4000446a00444a666ae68cdc78010040998189119a800a4000446a00444a666ae68cdc7801006880089803001800898030018019192999ab9a3022001018153335734604200202603e604e6ea800488c8c94ccd5cd1812000889110008a999ab9a30230011321222300300430043574260500042a666ae68c08800444888008080c0a0004dd50009192999ab9a301f30260011323212330010030023004357426ae88c098008c020d5d0981280080e9baa00123253335734603c604a0022646464646464646424666600201200e0060046602ceb8d5d09aba200453335734604c002264244460040086ae84c0a800854ccd5cd1812800899091118008021bae3574260540042a666ae68c0900044488800c088c0a8004dd51aba10013574400466600ceb8014d5d08009aba23025002300c3574260480020386ea8004cc005d73ad222330252233335573e0024030464660346601a600e6050002600c604e00260086ae8800cd5d080100d1bab0012323253335734603e00226424444600800a60086ae84c08800854ccd5cd180f00089909111180100298059aba13022002153335734603a00226424444600200a600a6ae84c08800854ccd5cd180e0008990911118018029bae35742604400403460440026ea80048c8c94ccd5cd19b874803000444888802854ccd5cd19b874802800444888888801054ccd5cd19b87480200044c8c848888888cc004024020dd69aba13574460440066eb8d5d098108010a999ab9a301e001132321222222233002009008375c6ae84d5d118110019bae3574260420042a666ae68c0740044c8c848888888cc018024020dd71aba135744604400660146ae84c08400854ccd5cd180e00089909111111180380418051aba13021002153335734603600226424444444600a01060146ae84c084008064c084004dd50009192999ab9a30193020001132321233001003002375a6ae84d5d1181000118019aba1301f0010173754002464a666ae68c060c07c0044dd71aba1301e001016375400244400644246600200600444424666002008006004464a666ae68c050c06c0044c8c848cc00400c008cc018010d5d09aba2301b00230043574260340020246ea80048c8c94ccd5cd180a8008991919190911998008030020019bad357426ae88008dd69aba10013574460360066eb4d5d0980d0010a999ab9a30140011321223002003300435742603400402460340026ea80048c8c94ccd5cd180a00089909118008019bae3574260320042a666ae68c04c0044c8488c00800cdd71aba1301900201130190013754002446464a666ae68c04c0044c8488c00800cc010d5d0980c8010a999ab9a30140010050113019001375400220022014446602c446666aae7c00480248cc028c014d5d080118019aba200200b375800260264422444a66a00220044426600a004666aa600e01a00a0080026024442244a66a00200a44266012600800466aa600c016008002200220084424466002008006601c4422444a66a00226a006010442666a00a0126008004666aa600e01000a0080022400244004440022a66ae712401035054310016253357389201024c680016370e90001b8748008dc3a40086e1d2006374a90001ba54800955cf2ab9d23230010012233003300200200101";
    const expectedHash =
      "ed99c4ef2d46d44be81254424b5bc2ad19056d9e70b22c4c6bbc174a";
    expect(getV2ScriptHash(applyParamsToScript(scriptCbor, []))).toBe(
      expectedHash,
    );
  });
});
