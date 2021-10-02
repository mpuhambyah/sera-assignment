const expect = require('chai').expect;
const request = require('supertest');

const server = require('../index.js');

const mongoose = require('mongoose');

const Product = require("../app/models/Product.js");

var app = request.agent(server);



before(function (done) {
    mongoose.connect("mongodb://localhost:27017/db_restful", function () {
        mongoose.connection.db.dropDatabase(function () {
            done();
        });
    });
});

describe("POST Testing", function () {
    describe("Adding new post", function () {
        it("Success should be true", function () {
            app.post("/api/products").send({
                title: "Testing",
                price: "5000"
            }).end((err, res) => {
                expect(res.body.success).to.equal(true)
            });
        });
    });
});

describe("GET Testing", function () {
    describe("Find All Products", function () {
        it("Success should be true", function () {
            app.get("/api/products").end((err, res) => {
                expect(res.body.success).to.equal(true)
            });
        });
    });
});

describe("PUT Testing", function () {
    let product = null;
    before("Find A Product", async function () {
        product = await Product.findOne({
            title: "Testing"
        });
        postId = product._id;
    });
    describe("Edit A Post", async function () {
        let result = null;
        before(async function () {
            result = await app.put(`/api/products/${postId}`).send({
                title: "Testing Edit",
                price: "5000"
            });
        });
        it("Success should be true", function (done) {
            expect(result.body.success).to.equal(true);
            done();
        });
    });
});