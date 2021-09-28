const rewire = require("rewire")
const server = rewire("./server")
const WriteTextToEmploeeFileAsync = server.__get__("WriteTextToEmploeeFileAsync")
// @ponicode
describe("WriteTextToEmploeeFileAsync", () => {
    test("0", async () => {
        let result = await WriteTextToEmploeeFileAsync("^5.0.0")
        expect(result).toBe(undefined)
    })
})
