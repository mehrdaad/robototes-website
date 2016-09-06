/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var expect = require("chai").expect,
    request = require("supertest"),
    extend = require("util")._extend;

describe("Modules", function() {
    var package = require("../../package"),
        modules = extend(package.dependencies, package.devDependencies);
    
    for(var i in modules) {
        if(modules.hasOwnProperty(i))
            describe(i, function() {
                it("is installed", function() {
                    expect(require(i)).to.not.be.equal(null);
                });
                it("is up to date", function(done) {
                    this.timeout(10000);
                    require("child_process").exec("npm show " + i + " version", function(err, stdout, stderr) {
                        if(err) return done(err);
                        expect(stdout.trim()).to.be.equal(modules[i].substr(1));
                        done();
                    });
                });
            });
    }
});