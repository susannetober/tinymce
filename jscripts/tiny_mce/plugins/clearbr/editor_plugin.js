(function(){tinymce.PluginManager.requireLangPack('clearbr');tinymce.create('tinymce.plugins.ClearbrPlugin',{init:function(ed,url){ed.addCommand('mcePasteClearbr',function(){var html='<br clear="all" />';tinyMCE.get('body').execCommand('mceInsertContent',false,html);});ed.addButton('clearbr',{title:'clearbr.desc',cmd:'mcePasteClearbr'});ed.onNodeChange.add(function(ed,cm,n){cm.setActive('clearbr',n.nodeName=='IMG');});},createControl:function(n,cm){return null;},getInfo:function(){return{longname:'Clearbr TinyMCE plugin',author:'Susanne.Tober@uibk.ac.at',authorurl:'http://www.uibk.ac.at/',infourl:'http://www.uibk.ac.at/zid/systeme/xims/tinymce_clearbr.html',version:"0.03"};}});tinymce.PluginManager.add('clearbr',tinymce.plugins.ClearbrPlugin);})();