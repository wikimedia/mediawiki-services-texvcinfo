"use strict";
var assert = require('assert');
var texvc = require("texvcjs");
var lister = require('../lib/identifier');
var testcases = [
    {in: '', out: []},
    {in: 'a', out: ['a']},
    {in: 'a^2', out: ['a']},
    {in: 'a^2+b^2', out: ['a', 'b']},
    {in: 'a^{2}+b^{2}', out: ['a', 'b']},
    {in: '\\frac2b', out: ['b']},
    {in: 't_a', out: ['t_{a}']},
    {in: '\\mathrm{kg}', out: ['\\mathrm{kg}']},
    {in: '\\sqrt[3]{81}', out:[]},
    {in: 'a_{bc}', out: ['a_{bc}']},
    {in: 'a_{b,c}', out: ['a_{b,c}']},
    {in: "a'_{k}", out: ['a\'','k']},
    {
        in: "\\hat{U}(t,t_0)=\\exp{\\left(-\\frac{i}\\hbar \\int_{t_0}^t \\hat{H}(t')dt'\\right)}",
        out: ['\\hat{U}', 't', 't_{0}', 'i', '\\hbar', 't_{0}', 't', '\\hat{H}', 't\'', 't\'']
    },
    {
        in: "\\begin{align}\n  &[\\mathrm j_k, \\mathrm j_l]\n" +
        "    \\equiv \\mathrm j_k \\mathrm j_l - \\mathrm j_l \\mathrm j_k\n" +
        "    = i \\hbar \\sum_m \\varepsilon_{k, l, m} \\mathrm j_m\n" +
        "    & k, l, m &\\in \\{\\mathrm x, \\mathrm y, \\mathrm z\\}\n" +
        "\\end{align}",
        out: ["\\mathrm{j}_{k}", "\\mathrm{j}_{l}", "\\mathrm{j}_{k}", "\\mathrm{j}_{l}", "\\mathrm{j}_{l}", "\\mathrm{j}_{k}",
            "i", "\\hbar", "m", "\\varepsilon_{k,l,m}", "\\mathrm{j}_{m}", "k", "l", "m", "\\mathrm{x}", "\\mathrm{y}", "\\mathrm{z}"]
    },
    {
        in: "x = \\int_1^y {\\mathrm{d}t \\over t}",
        out: ["x", "y", "t", "t"]
    },
    {
        in: "f'(x) = \\lim_{h \\to 0}{f(x+h) - f(x)\\over{h}}",
        out: ["f'", "x", "h", "f", "x", "h", "f", "x", "h"]
    },
    {
        in: "\\dot m = C_d A \\sqrt{k \\rho_0 P_0 \\left(\\frac{2}{k + 1}\\right)^{\\frac{k + 1}{k - 1}}}",
        out: ["\\dot{m}", "C_{d}", "A", "k", "\\rho_{0}", "P_{0}", "k", "k", "k"]
    },
    {
        in: "\\forall x \\Big(\\forall y (y \\in x \\rightarrow P[y]) \\rightarrow P[x]\\Big) \\rightarrow \\forall x \\, P[x]",
        out: ["x", "y", "y", "x", "P", "y", "P", "x", "x", "P", "x"]
    },
    {
        in: "\\text{Magnetic Reynolds number  }",
        out: []
    },
    {
        in: "\\int_{R_n} \\cdots \\int_{R_2} \\int_{R_1} f(x_1, x_2, \\ldots, x_n)" +
        " \\, dx_1 dx_2\\cdots dx_n \\equiv \\int_R f(\\boldsymbol{x}) \\, d^n\\boldsymbol{x}",
        out: ['R_{n}', 'R_{2}', 'R_{1}', 'f', 'x_{1}', 'x_{2}', 'x_{n}',
            'x_{1}', 'x_{2}', 'x_{n}', 'R', 'f', '\\boldsymbol{x}', 'n', '\\boldsymbol{x}']
    },
    //{in: "\\reals", out:["\\reals"]},
    //{in: "\\mathrm {MTF}_{display}(\\xi,\\eta)", out: ["\\mathrm{MTF}_{display}", "\\xi", "\\eta"]}
];

describe('Identifiers', function () {
    testcases.forEach(function (tc) {
        var input = tc.in;
        var output = tc.out;
        it('should be discovered ' + JSON.stringify(input), function () {
            assert.deepEqual(lister(texvc.parse(input)), output);
        });
    });
});