(function(){tinymce.PluginManager.requireLangPack("clearbr");tinymce.create("tinymce.plugins.ClearbrPlugin",{init:function(a,b){a.addCommand("mcePasteClearbr",function(){var c='<br clear="all" />';tinyMCE.get("body").execCommand("mceInsertContent",false,c)});a.addButton("clearbr",{title:"clearbr.desc",cmd:"mcePasteClearbr"});a.onNodeChange.add(function(d,c,e){c.setActive("clearbr",e.nodeName=="IMG")})},createControl:function(b,a){return null},getInfo:function(){return{longname:"Clearbr TinyMCE plugin",author:"Susanne.Tober@uibk.ac.at",authorurl:"http://www.uibk.ac.at/",infourl:"http://www.uibk.ac.at/zid/systeme/xims/tinymce_clearbr.html",version:"0.03"}}});tinymce.PluginManager.add("clearbr",tinymce.plugins.ClearbrPlugin)})();