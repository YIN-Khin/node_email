

var { getPurchaseItem, createPurchaseItem, updatePurchaseItem, deletePurchaseItem, getById }=require("../controllers/PurchaseItemController");
const auth = require("../middlewares/auth.middleware")
const purchaseItem = (app)=>{
    app.get("/api/purchaseItem",auth.validate_token(),getPurchaseItem);
    app.get("/api/purchaseItem/:id",getById);
    app.post("/api/purchaseItem",createPurchaseItem);
    app.put("/api/purchaseItem/:id",updatePurchaseItem);
    app.delete("/api/purchaseItem/:id",deletePurchaseItem);
}

module.exports=purchaseItem;
