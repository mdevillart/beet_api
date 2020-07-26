const mongoose = require ('mongoose'); 

const CompanySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    document: {
        type: String,
        required: true
        }, 
    website: {
        type: String, 
        required: false
    }, 
    dash_url: {
        mundipagg_dash_url: { 
            type: String,
            required: true
        },
        pagarme_dash_url: { 
            type: String,
            required: true
        },
    }, 
    address: {
        line_1: { 
            type: String,
            required: true
        },
        line_2: { 
            type: String,
            required: false
        },
        zip_code: { 
            type: String,
            required: true
        },
        city: { 
            type: String,
            required: true
        },
        state: { 
            type: String,
            required: true
        },
        country: { 
            type: String,
            required: true
        },
    },
    security_affiliations: {
        antifraud: { 
            type: String,
            required: true
        },
    }, 
    notify_information: {
        webhook: { 
            type: Boolean,
            required: true
        },
        notification_post: { 
            type: Boolean,
            required: true
        },
    }, 
    payment_methods: {
        credit_card: { 
            type: Boolean,
            required: true
        },
        private_label: { 
            type: Boolean,
            required: true
        },
        debit_card: { 
            type: Boolean,
            required: true
        },
        boleto: { 
            type: Boolean,
            required: true
        },
        online_debit: { 
            type: Boolean,
            required: true
        },
        checkout: { 
            type: Boolean,
            required: true
        },
        voucher: { 
            type: Boolean,
            required: true
        },
        safetypay: { 
            type: Boolean,
            required: true
        },
        googlepay: { 
            type: Boolean,
            required: true
        },
        cash: { 
            type: Boolean,
            required: true
        },
        subscriptions: { 
            type: Boolean,
            required: true
        },
    },
    payment_affiliations: {
        acquirer_1: { 
            type: String,
            required: false
        },
        acquirer_2: { 
            type: String,
            required: false
        },
        acquirer_3: { 
            type: String,
            required: false
        },
        acquirer_4: { 
            type: String,
            required: false
        },
        acquirer_5: { 
            type: String,
            required: false
        },
        acquirer_6: { 
            type: String,
            required: false
        },
        boleto_bank: { 
            type: String,
            required: false
        },
        online_debit_bank_1: { 
            type: String,
            required: false
        },
        online_debit_bank_2: { 
            type: String,
            required: false
        },
        online_debit_bank_3: { 
            type: String,
            required: false
        },
        split: { 
            type: String,
            required: false
        },
    },
    contacts: {
        contact_1: { 
            contact_1_name: {
                type: String,
                required: true
            },
            contact_1_email: {
                type: String,
                required: true
            },
            contact_1_role: {
                type: String,
                required: true
            },
            contact_1_phones: {
                work_phone: {
                    country_code: {
                        type: String,
                        required: true
                    },
                    area_code: {
                        type: String,
                        required: true
                    },
                    number: {
                        type: String,
                        required: true
                    },
                },
                mobile_phone: {
                    country_code: {
                        type: String,
                        required: true
                    },
                    area_code: {
                        type: String,
                        required: true
                    },
                    number: {
                        type: String,
                        required: true
                    },
                }
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Company = mongoose.model('Company', CompanySchema);  

module.exports = Company;