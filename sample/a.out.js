function require(index) {
	var moduleObj = {exports: {}},
		moduleFunc = require.modules[index];

	require.modules[index] = function () { return moduleObj.exports };

	moduleFunc(moduleObj, moduleObj.exports);
	
	return module.exports;
}

require.modules = [function(module, exports) {
    module.exports = require(1) * 2;
}, function(module, exports) {
    module.exports = require(2).value * 7;
}, function(module, exports) {
    exports.value = 3;
}];

require(0);