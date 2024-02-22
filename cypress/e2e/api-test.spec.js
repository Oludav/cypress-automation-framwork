/// <reference types="cypress" />

describe('JSONPlaceholder API Tests', () => {
    it('should fetch all posts', () => {
      cy.request({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
      });
    });
  
    it('should fetch posts made by userId 1 and return the count', () => {
      Cypress.Commands.add('getPostCountByUserId', (userId) => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts?userId=${userId}')
          .its('body')
          .then((posts) => {
            return posts.length;
          });
      });
    });
  });

  describe("Fetch Users and Associated Posts", () => {
    it("Fetch all users", () => {
      cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        headers: {
          accept: "application/json"
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        // Log the list of users
        cy.log("Users:", response.body);
      });
    });
  
    it("Print a user's name, email, and address to console", () => {
      // Randomly select a user ID between 1 and 10 (inclusive)
      const userId = Cypress._.random(1, 10);
      cy.request({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/users/${userId}`,
        headers: {
          accept: "application/json"
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        const user = response.body;
        // Log the user's name, email, and address
        cy.log(`User ${user.name} (${user.email}) lives at ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`);
      });
    });
  
    it("Get user's associated posts", () => {
      // Randomly select a user ID between 1 and 10 (inclusive)
      const userId = Cypress._.random(1, 10);
      cy.request({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        headers: {
          accept: "application/json"
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        // Log the user's associated posts
        cy.log(`User ${userId}'s posts:`, response.body);
      });
    });
  });
  
  describe("Restful Booker API Tests", () => {
    let authToken;
  
    it("Create an auth token", () => {
      cy.request({
        method: "POST",
        url: "https://restful-booker.herokuapp.com/auth",
        body: {
          "username": "admin",
          "password": "password123"
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        authToken = response.body.token;
      });
    });
  
    it("Get all booking IDs", () => {
      cy.request({
        method: "GET",
        url: "https://restful-booker.herokuapp.com/booking",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        cy.log("All Booking IDs:", response.body.map(booking => booking.bookingid));
      });
    });
  
    it("Create a booking", () => {
      const bookingDetails = {
        "firstname": "John",
        "lastname": "Doe",
        "totalprice": 200,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2023-01-01",
          "checkout": "2023-01-10"
        },
        "additionalneeds": "Breakfast"
      };
      cy.request({
        method: "POST",
        url: "https://restful-booker.herokuapp.com/booking",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: bookingDetails
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("bookingid");
        cy.log("New Booking ID:", response.body.bookingid);
      });
    });
  
    // Update a booking
    it('Update a Booking', () => {
      const updatedBookingData = {
        firstname: 'UpdatedJohn',
        lastname: 'UpdatedDoe',
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
      };
      cy.request({
        method: 'PUT',
        url: "https://restful-booker.herokuapp.com/booking/${bookingId}",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${authToken}`,
        },
        body: updatedBookingData,
        failOnStatusCode: false, 
      }).then((response) => {
        if (response.status === 403) {
          cy.log('403 Forbidden Error:', response.body); // Log the error response
        } else {
        }
      });
    });
  });