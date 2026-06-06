const Bill = require("../models/Bill");
const month =
  new Date(date)
    .toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );

const milkPricePerLiter = 60;

const milkCost =
  quantity * milkPricePerLiter;


// find existing bill
let bill = await Bill.findOne({
  customer,
  month,
});


// if bill exists
if (bill) {

  bill.totalMilkCost += milkCost;

  bill.totalAmount =
    bill.totalMilkCost +
    bill.productCost;

  await bill.save();

} else {

  // create new bill
  bill = await Bill.create({

    customer,

    month,

    totalMilkCost:
      milkCost,

    productCost: 0,

    totalAmount:
      milkCost,

  });

}