function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu("Auto Trigger")
    .addItem("Run","createSpreadsheetEditTrigger")
    .addToUi();
  var fail =  SpreadsheetApp.getActiveSpreadsheet();
  
  var id_failil = fail.getId();
  var name_failil = fail.getName();
  
  var id_kaust = name_failil.split(" ").splice(-1)[0]
  Logger.log(id_kaust);
  
  var target_f = DriveApp.getFoldersByName(id_kaust);

  
  var onMis = DriveApp.getFileById(id_failil).getParents();
  

  var file, data, sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Kaustad");
  sheet.clear();
  while (target_f.hasNext()) {
 
    file = target_f.next();
        
    data = [ 
      file.getName(),
      file.getId(),
      file.getDateCreated(),
      file.getSize(),
      file.getUrl(),
      "https://docs.google.com/uc?export=download&confirm=no_antivirus&id=" + file.getId(),
      file.getDescription(),
    ];
    sheet.appendRow(data);
    
  }
  
  sheet.sort(1);
  sheets();
}

function sheets() {
  var target_f =  SpreadsheetApp.getActiveSpreadsheet().getSheets();
   

  var file, data, sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheedid");
  sheet.clear();
  for (i = 0; i < target_f.length; i++) { 
    file = target_f[i];
        
    data = [ 
      file.getName(),
      file.getSheetId(),

    ];  
    sheet.appendRow(data);
  }
      
    sheet.sort(1);

}

function SHEETNAME() {
  try {
  	var ss = SpreadsheetApp.getActiveSpreadsheet();
  	var s = ss.getActiveRange().getSheet();
  	return s.getName();
  } catch(e) {
	Logger.log("Pole avada sheeti");
   // if the script throws an error,
   // do something with the error here
  }
}

function onChange(e) {

    var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveRange().getSheet();
    //var s = ss.getActiveRange().getSheet();
  Logger.log(ss.getName());
  var range = ss.getRange("V10");                          
  var cell = ss.getDataRange();
  
  range.copyFormatToRange(ss.getSheetId(), 6, 20, 2, 30);
  
 //var cell = ss.getRange("F3");
 
/*  
  cell.setWrap(false);

    Logger.log(cell.getBackground());
    Logger.log(cell.setFontColor("red"));*/
}
      
function createSpreadsheetEditTrigger() {
  var ss = SpreadsheetApp.getActive();
  if (ScriptApp.getProjectTriggers().length == 0) {
      
      ScriptApp.newTrigger('onChange')
      .forSpreadsheet(ss)
      .onChange()
      .create();
      ScriptApp.newTrigger('onOpen')
      .forSpreadsheet(ss)
      .onOpen()
      .create();
  }
}
