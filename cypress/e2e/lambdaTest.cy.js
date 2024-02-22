import { faker } from '@faker-js/faker';
const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
describe('Verify Lambda Home Page', () => {


before(function(){
        cy.visit('https://ecommerce-playground.lambdatest.io/');
     })

    //  it('Login', function ()  {
    //     cy.get('#widget-navbar-217834 > .navbar-nav > :nth-child(6) > .nav-link > .info > .title').click()
    //     cy.get('.list-group > .active').click();
    //     cy.get('#input-email').type('david.olusoga005@gmail.com')
    //     cy.get('#input-password').type('qwert')
    //     cy.get('form > .btn').click()
      
    //     })
    
        it('Search', function ()  {
         cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type("phone")
         cy.get('.type-text').click();
      
        })
    
       it("Add To Cart", function(){
        cy.xpath('//*[@id="entry_212469"]/div/div[2]/div/div[1]/div[2]/button[1]/span').click({force:true});
       })
    
       it("Proceed To Checkout",()=>{
        cy.get('.btn.btn-secondary.btn-block').click({force:true});
       })
    
    
       it("Fill Checkout form", function(){
        //Enter first Name
        cy.get('#input-payment-firstname').type("Emman");

        //Enter Last Name
        cy.get('#input-payment-lastname').type("Okondo");

        //Enter New Billing Address
        //cy.get('div#payment-address > div:nth-of-type(2) > .custom-control.custom-radio > .custom-control-label').click();
        
        //Enter Email
        //const randomEmail = Math.random().toString(36).substring(2,25)+"gmail.com"
         cy.get('#input-payment-email').type(randomEmail);

        //Enter PhoneNumber
        cy.get('#input-payment-telephone').type("0809895524");

        //Enter Password
        cy.get('#input-payment-password').type("QWERT12345");

        //Enter Confirm Password
        cy.get('#input-payment-confirm').type("QWERT12345");

        //Enter Company
        cy.get('#input-payment-company').type("Davtect Solution");

        //Enter Address 1
        cy.get('#input-payment-address-1').type("23, Anina Street Ojota Lagos");

        //Enter City
        cy.get('#input-payment-city').type("Lagos");

        //Enter Post Code
        cy.get('#input-payment-postcode').type("23456");

        //Select Country
        cy.get('#input-payment-country').select("Nigeria");

        //Select State
        cy.get('#input-payment-zone').select("Lagos");

        //Uncheck Newsletter
        cy.get('.sticky-top > :nth-child(3) > .custom-control-label').click();

        //Check Pravacy Policy
        cy.get('div:nth-of-type(4) > .custom-control-label').click({force:true});

        //Check Terms & Conditions
        cy.get('div:nth-of-type(5) > .custom-control-label').click({force:true});
        cy.get('#button-save').click({force:true});


       })
        
        
        it("Confirm Order",()=>{
        cy.get('#button-confirm').click();
           })

        it("Log Out",()=>{
            cy.get('#widget-navbar-217834 > .navbar-nav > :nth-child(6) > .nav-link > .info > .title').click({force:true});
            cy.get('li:nth-of-type(6) > .both.dropdown-item.icon-left').click({force:true});
        })
        
     })
    
    
    