# unit-node-sdk

This library provides a typescript wrapper to [Unit's API](https://developers.unit.co/#introduction).

## Documentation
See Unit's API docs

## Installation

```bash
npm install unit
```

## Usage


#### Create an individual application
```js
(async () => {
    let createApplicationRequest: CreateIndividualApplicationRequest = {
        type: "individualApplication",
        attributes: {
    		"ssn": "000000002",
        	"fullName": createFullName("Richard", "Hendricks"),
            "dateOfBirth": "2001-08-10",
            "address": createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
            "email": "april@baxter.com",
            "phone": createPhone("1", "2025550158"),
            "ip": "127.0.0.1",
            "ein": "123456789",
            "dba": "Pied Piper Inc",
            "soleProprietorship": true
        }
    }

    let customer = await unit.applications.create(createApplicationRequest).catch<UnitError>(err => {
        // handle errors
        return err
    })

    console.log(customer)
})();
```

#### Fetching a customer
```js
import { Unit } from "./unit"

const unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

(async () => {
    let customer = await unit.customers.get(customerId).catch<UnitError>(err => {
        // handle errors
        return err
    })

    console.log(customer)
})();
```