var stdUtils = exports.std = require('path'),
	nodeResolve = require('resolve'),
	badPathSep = /\\/g;

exports.forceExt = function (path, ext) {
	return path + (exports.ext(path) ? '' : '.' + ext);
};

exports.normalizePath = function (path) {
	return exports.relative('', path);
};

exports.relative = function (from, to) {
	return stdUtils.relative(from, to).replace(badPathSep, '/');
};

exports.getNodePath = function (from, to, options) {
	var fromDir = from + '/..';

	return exports.normalizePath(nodeResolve.sync(to, {
		basedir: stdUtils.resolve('', fromDir),
		extensions: (options.defaultExt !== 'js' ? ['.' + options.defaultExt] : []).concat(['.js', '.json']),
		moduleDirectory: options.moduleDir
	}));
};

exports.ext = function (path) {
	return stdUtils.extname(path).slice(1).toLowerCase();
};

//
// path for external dependencies
// I'm not sure if this is working by coincidence
exports.getNodePathExternal = function (from, to, options) {

	var fromDir = from;
	var opts = {
		basedir: stdUtils.resolve('', fromDir),
		extensions: (options.defaultExt !== 'js' ? ['.' + options.defaultExt] : []).concat(['.js', '.json']),
		moduleDirectory: options.moduleDir
	};


	var resolved = nodeResolve.sync(to, opts);

	return exports.normalizePath(resolved);

};