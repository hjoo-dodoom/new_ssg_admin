/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		'/',
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,SelectAll,Scayt,Flash,ShowBlocks,Maximize,About,NewPage,Preview,Print,Form,Checkbox,Radio,Textarea,Select,Button,ImageButton,HiddenField,Undo,Find,Replace,Redo,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe';
	//config.removeButtons = 'Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,SelectAll,Scayt,Flash,ShowBlocks,Maximize,About,NewPage,Preview,Print,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Undo,Find,Replace,Redo,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	
	// Image upload enable
	config.filebrowserUploadMethod = 'form';
	config.filebrowserUploadUrl = '/common/ckeditorImageUpload';
	
	config.extraPlugins = 'font';
	config.forceSimpleAmpersand = true;
	
	config.height = "550";
	config.width = "100%";

    config.allowedContent = true;
};
