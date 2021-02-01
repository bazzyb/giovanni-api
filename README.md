# Giovanni 

This is a simple api to mimic taking orders and a small italian caffe.
It accepts orders from a customer, taking just a name, schedules the order, and can return the schedule of orders. 

It is considered to be a first draft, which would be expanded upon after further review with the owner, Giovanni. 

## How to run
- Run in development mode: yarn dev
- Tests: yarn test
- Build: yarn build
- Run in production after building: yarn start

## Assumptions
- Not taking information regarding sandwich type, either from a menu, or bespoke
- No way to remove orders from list currently, either from schedule, action by Giovanni, or cancellation from customer
- Break will be dynamic based on orders. So if more orders come in, break is always moved to the end

