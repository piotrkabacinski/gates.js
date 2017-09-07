describe('Gates.js unit tests: ', function() {

    const gates = gatesJs;

    const responseCode = {
        content: {
            foo: true
        },
        statusCode: 200
    };

    var value;

    afterEach(function() {
      value = undefined;
    });

    it('1. Success response and true expression', function() {

        new gates().set(responseCode.statusCode)
            .gate([200, responseCode.content.foo === true], function() {
                value = true;
            })
            .default(function() {
                value = false;
            });

        expect(value).toEqual(true);

    });

    it('2. Whatever response and whatever expression', function() {

        new gates().set(responseCode.statusCode)
            .gate([200, responseCode.content.foo === false], function() {
                value = false;
            })
            .gate(["*", "*"], function() {
                value = true;
            })
            .default(function() {
                value = false;
            });

        expect(value).toEqual(true);

    });

    it('3. Whatever response and true expression', function() {

        new gates().set(responseCode.statusCode)
            .gate(["*", responseCode.content.foo === true], function() {
                value = true;
            })
            .default(function() {
                value = false;
            });

        expect(value).toEqual(true);

    });

    it('4. Susccess response and whatever expression', function() {

        new gates().set(responseCode.statusCode)
            .gate([200, "*"], function() {
                value = true;
            })
            .default(function() {
                value = false;
            });

        expect(value).toEqual(true);

    });

    it('5. Susccess response and no expression', function() {

        new gates().set(responseCode.statusCode)
            .gate([200], function() {
                value = true;
            })
            .default(function() {
                value = false;
            });

        expect(value).toEqual(true);

    });

});
