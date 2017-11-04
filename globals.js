var globals = [];

globals.paths = {};

globals.paths.Logic = __dirname + "/Logic";
globals.paths.Views = __dirname + "/Views";
globals.paths.Styles = __dirname + "/Styles";
globals.paths.Scripts = __dirname + "/Scripts";
globals.paths.Data = __dirname + "/Data";
globals.paths.Controllers = __dirname + "/Controllers";
globals.paths.NodeModules = __dirname + "/node_modules";
globals.paths.Content = globals.paths.Data + "/Content";
globals.paths.Images = globals.paths.Content + "/Images";

module.exports = globals;