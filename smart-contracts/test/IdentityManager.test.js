const IdentityManager = artifacts.require("IdentityManager");

contract("IdentityManager", (accounts) => {
  it("doit stocker et récupérer un document correctement", async () => {
    const instance = await IdentityManager.deployed();

    // Ajout d'un document
    await instance.addDocument(
      "QmCIDTest",
      "application/pdf",
      "TitreTest",
      "docTypeTest",
      { from: accounts[0] }
    );

    // Récupération des documents pour le compte accounts[0]
    const docs = await instance.getDocumentsByOwner(accounts[0]);

    // Vérifications
    assert.equal(docs.length, 1, "Un document doit être présent");
    assert.equal(docs[0].cid, "QmCIDTest", "Le CID doit correspondre");
    assert.equal(docs[0].mimeType, "application/pdf", "Le mimeType doit correspondre");
    assert.equal(docs[0].title, "TitreTest", "Le titre doit correspondre");
    assert.equal(docs[0].docType, "docTypeTest", "Le docType doit correspondre");
  });
});
