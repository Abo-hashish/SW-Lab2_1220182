let items = [];
let transactions = [];
let categories = [];
let fields = {};

function selectAction(actionType, itemParameters) {

    switch (actionType) {
        case "add":
            addItem(itemParameters);
            break;

        case "edit":
            editItem(itemParameters);
            break;

        case "remove":
            removeItem(itemParameters[0]);
            break;
        
        case "sale":
            sellItem(itemParameters[0], itemParameters[2]);
            break;
        
        case "restock":
            restockItem(itemParameters[0], itemParameters[2]);
            break;

        case "search":
            console.log(items.filter(x => [x.n, x.categories, x.price].some(v => v.toString().toLowerCase().includes(itemParameters[0].toLowerCase()))));
            break;
        
        case "viewInv":
            console.log("=== Inv ===", items);
            break;
        
        case "viewTrans":
            console.log("Transactions:\n", transactions);
            break;

        case "viewInvAge":
            console.log(items.map(x => `${x.name}: ${Math.floor((new Date() - new Date(x.dateAdded)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
            break;

        case "exportAll":
            console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(items.map(x => Objectransactions.values(x).join(','))).join('\n'));

        case "import":
            itemParameters[0].forEach(x => selectAction("add", [x.name, x.category, x.quantity, x.price, x.unit]));
            break;

        case "addField":
            if (!fields[itemParameters[0]]) { 
                fields[itemParameters[0]] = null;
            }
            break;

        case "updateField":
            items.find(x => x.name === itemParameters[0])?.customFields[itemParameters[1]] = itemParameters[2];
            break;
    }

}

function addItem(itemParameters) {
    let item = { 
        name: itemParameters[0], 
        category: itemParameters[1], 
        quantity: itemParameters[2],
        price: itemParameters[3], 
        unit: itemParameters[4], 
        dateAdded: new Date(),
        customFields: itemParameters[5] || {} };

    items.push(item);
    if (!categories.includes(itemParameters[1])) { 
        categories.push(itemParameters[1]);
    }
    transactions.push({ type: "add", item });
    printDashboard();
}

function editItem(itemParameters) {
    transactions.push({ type: "edit", old: items[itemParameters[0]], new: itemParameters.slice(1) });
    items[itemParameters[0]] = { 
        ...items[itemParameters[0]], 
        name: itemParameters[1], 
        category: itemParameters[2], 
        quantity: itemParameters[3], 
        pric: itemParameters[4], 
        unit: itemParameters[5], 
        customFields: itemParameters[6] || {} 
    };
    printDashboard();
}

function removeItem(itemName) {
    transactions.push({ type: "delete", item: itemName });
    items.splice(itemName, 1);
    printDashboard();
}

function printDashboard() {
    console.log("=== Dashboard ===\nItems: " 
        + items.length + "\nTotal: $" 
        + items.reduce((tot, x) => tot + x.qty * x.prc, 0).toFixed(2) 
        + "\nCategories: " + categories.join(', '));
}

function sellItem(itemName, itemQuantity)
{
    for (let item of items)
    {
        if (item.name === itemName)
        {
            if (item.quantity >= itemQuantity) {
                item.quantity -= itemQuantity;
                transactions.push({ type: "sale", item: item, quantitySold: itemQuantity, sellDate: new Date() });
                console.log(`Sold ${itemQuantity} ${item.unit} of ${item.name}`);
            }
            if(item.quantity<=10) {
                console.log(`the item ${item.name} has less than 10 items remaining`);
            }
        }
    }
}

function restockItem(itemName, itemQuantity)
{
    for (let item of items)
    {
        if(item.name === itemName) {
            item.quantity += itemQuantity;
            transactions.push({ type: "restock", item: item, quantityRestocked: itemQuantity, sellDate: new Date() });
            console.log(`Restocked ${itemQuantity} ${item.unit} of ${item.name}`);
        }
    }
}
