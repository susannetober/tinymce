/**
 * editor_plugin_src.js
 *
 * Copyright 2010, Susanne Tober Universität Innsbruck
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function(){
	// Load plugin specific language pack
    tinymce.PluginManager.requireLangPack('caption');
	
	tinymce.create('tinymce.plugins.CaptionPlugin', {
		init : function(ed, url) {
			// Register commands
			ed.addCommand('mceCaption', function() {
				if (ed.dom.getAttrib(ed.selection.getNode(), 'class').indexOf('mceItem') != -1)
					return;

				ed.windowManager.open({
					file : url + '/caption.htm',
					width : 480, // + parseInt(ed.getLang('imagecaption.delta_width', 0)),
					height : 230, // + parseInt(ed.getLang('imagecaption.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register button
			ed.addButton('caption', {
				title : 'caption.desc',
				cmd : 'mceCaption'
			});
			
			// Add a node change handler, selects the button in the UI when a image is selected
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('caption', n.nodeName == 'IMG');
			});
		},

		getInfo : function() {
			return {
				longname : 'Image Caption',
				author : 'Susanne Tober',
				authorurl : 'http://www.uibk.ac.at/zid/',
				infourl : 'http://www.uibk.ac.at/zid/systeme/xims/',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},
		updateCaption : function(ed){
			var settings = {
				wrapperElement: 'div',
				wrapperClass: 'caption',
				captionElement: 'p',
				imageAttr: 'alt',
				requireText: true,
				copyStyle: true,
				removeStyle: true,
				removeAlign: true,
				copyAlignmentToClass: false,
				copyFloatToClass: true,
				autoWidth: true,
		};
			//var ed = tinyMCEPopup.editor;
			var image = $(ed.selection.getNode());
			var parent = $(image).parent();
			/*while (!parent.hasClass('caption')) {
				parent = parent.parent();
			}*/
			if (parent && parent.is('div')) {
				//parent.css(image.css());
				parent.attr('style', image.attr('style'));
				parent.width(image.width());
				parent.height('');
				
				if (settings.removeStyle) 
					image.removeAttr('style');
				if (settings.removeAlign) 
					image.removeAttr('align');
				
				parent.removeAttr('_mce_style');
				image.removeAttr('_mce_style');
			}
			/*
			 else {
				//Only create captions if there is content for the caption
				//if(image.attr(settings.imageAttr).length > 0 || !settings.requireText){
				
				//Wrap the image with the caption div
				//image.wrap("<" + settings.wrapperElement + " class='" + settings.wrapperClass + "'></" + settings.wrapperElement + ">");
				image.wrap("<" + settings.wrapperElement + " class='caption' ></" + settings.wrapperElement + ">");
				
				//Save Image Float
				var imageFloat = image.css('float');
				
				//Save Image Style
				var imageStyle = image.attr('style');
				if (settings.removeStyle) 
					image.removeAttr('style');
				
				//Save Image Align
				var imageAlign = image.attr('align');
				if (settings.removeAlign) 
					image.removeAttr('align');
				
				//Put Caption in the Wrapper Div
				var div = image.parent().append('<' + settings.captionElement + ' style="padding:2px">' + image.attr(settings.imageAttr) + '</' + settings.captionElement + '>');

				//Copy Image Style to Div
				if (settings.copyStyle) 
					div.attr('style', imageStyle);
				
				//If there is an alignment on the image (for example align="left") add "left" as a class on the caption.  This helps deal with older Text Editors like TinyMCE
				if (settings.copyAlignmentToClass) 
					div.addClass(imageAlign);
				
				//Transfers the float style from the image to the caption container
				if (settings.copyFloatToClass) 
					div.addClass(imageFloat);
				
			//Properly size the caption div based on the loaded image's size
			//if(settings.autoWidth) div.width(image.width());
			}*/
		return;
		}
	},
	function removeCaption(ed){
		var image = $(ed.selection.getNode());
		var parent = $(image).parent();
		while (!parent.hasClass('caption')) {
			parent = parent.parent();
		}
		style = parent.attr('style');
		style = style.substr(0,style.indexOf('width')-1);
		image.attr('style', style);
		image.unwrap();
	});

	// Register plugin
	tinymce.PluginManager.add('caption', tinymce.plugins.CaptionPlugin);
	
	
	
})();



/* Import plugin specific language pack */
/*tinyMCE.importPluginLanguagePack('caption', 'en,hu');

function TinyMCE_caption_getControlHTML(control_name) {
    switch (control_name) {
        case "caption":
            return '<img id="{$editor_id}_caption" src="{$pluginurl}/images/caption.gif" title="{$lang_insert_caption_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceCaption\');" />';
    }
    return "";
}*/

/**
 * Executes the caption command.
 */
/*
function TinyMCE_caption_execCommand(editor_id, element, command, user_interface, value) {
    // Handle commands
    switch (command) {
        case "mceCaption":
            var template = new Array();
            template['file']   = '../../plugins/caption/caption.htm'; // Relative to theme
            template['width']  = 550;
            template['height'] = 400;
            var selElem;
            if (tinyMCE.selectedElement != null && tinyMCE.selectedElement.nodeName.toLowerCase() == "img"){
                selElem = tinyMCE.selectedElement;               
                tinyMCE.openWindow(template, {editor_id : editor_id,  selElem : selElem, mceDo : 'update'});
            }                     
       return true;
   }
   // Pass to next handler in chain
   return false;
}

function TinyMCE_caption_handleNodeChange(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {
	tinyMCE.switchClassSticky(editor_id + '_caption', 'mceButtonNormal');

	if (node == null)
		return;

	do {
		if (node.nodeName.toLowerCase() == "img")
			tinyMCE.switchClassSticky(editor_id + '_caption', 'mceButtonSelected');
	} while ((node = node.parentNode));
	
	return true;
}
*/