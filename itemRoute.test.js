process.env.NODE_ENV = "test";
const request = require('supertest')

const app = require("./express")
let item = require("./fakeDb")

let newItem = {name:"cheerios", price: 3.40}

beforeEach(function(){
    item.push(newItem)
})

afterEach(function(){
    item.length = 0 
})

describe("Get /items", () =>{
  test("Get all items", async () =>{
   const resp = await request(app).get("/item")
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toBe({item : [newItem]})
  })  
    }) 


describe("Post /items", () =>{
        test("Post all items", async () =>{
         const resp = await request(app)
         .post("/item")
         .send({name:"popsicle", price:1.45})
          expect(resp.statusCode).toBe(201)
          expect(resp.body).toBe({"added" :{name:"popsicle", price:1.45}})
        })  
          }) 

describe("Get /items/:name", () =>{
    test("Get item of a ceratin name", async () =>{
        const resp = await request(app).get(`/item/${newItem.name}`)
            expect(resp.statusCode).toBe(200)
              expect(resp.body).toBe({item : newItem})
            })  
              }) 
        test("responds with a 404", async ()=> {
                const resp = await request(app)
                 .get(`/item/stupid`)
                 expect(resp.statusCode).toBe(400)
            })
              
          

describe("Patch /items/", () =>{
    test("Patch all items", async () =>{
        const resp = await request(app)
             .patch(`/item/${newItem.name}`)
             .send({name:"soap", price:2.45})
              expect(resp.statusCode).toBe(200)
              expect(resp.body).toBe({"updated" :{name:"soap", price:2.45}})
            })  
        test("responds with a 404", async ()=> {
            const resp = await request(app)
             .patch(`/item/stupid`)
             expect(resp.statusCode).toBe(400)
        })
              }) 

describe("Delete /items/", () =>{
    test("Delete items", async () =>{
        const resp = await request(app)
            .delete(`/item/${newItem.name}`)
                expect(resp.statusCode).toBe(200)
                expect(resp.body).toBe({ message : deleted})
                 })  
    test("responds with a 404", async ()=> {
        const resp = await request(app)
        .delete(`/item/meathead`)
            expect(resp.statusCode).toBe(400)
            expect(resp.body).toBe({ message : deleted})
                    })
                          }) 