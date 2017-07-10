const fs = require('fs')

class KMLService {

    constructor(){}

    static createKML(filePath, cities){

        Object.keys(cities).forEach(city => {
            _createKMLFromCity(filePath, city, cities)
        })
    }
}

class XLSService {

    constructor(){}

    static createXLS(filePath, cities){

        _createXLSTemplate(filePath, cities)
    }
}

function _toTag(tagName, tagContent){
    return `<${tagName}>${tagContent}</${tagName}>`
}

function _createKMLFromCity(filePath, city, cities) {
    kmlString = 
`<?xml version="1.0" encoding="UTF-8"?>\r
<kml xmlns="http://www.opengis.net/kml/2.2">\r
    <Folder>\r
        <name>${cities[city][0].city}</name>\r`
        
    cities[city].forEach(point => {
        kmlString += `
        <Placemark>\r
            <name>${point.name}</name>\r
            <Point>\r
                <coordinates>${point.longitude},${point.latitude}</coordinates>\r
            </Point>\r
        </Placemark>\r`
    })
    
    kmlString += `
    </Folder>\r
</kml>`

    let name = `${filePath}/${cities[city][0].city}.kml`

    _writeFile(kmlString, name)
}

function _writeFile(content, name) {
    let buffer = new Buffer(content)

    fs.open(name, 'w', (err, fd) => {
        if (err) {
            throw 'error opening file: ' + err;
        }

        fs.write(fd, buffer, 0, buffer.length, null, err => {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, () => {
                console.log('fim da escrita de arquivo')
            })
        });
    });
}

function _createXLSTemplate(filePath, cities) {
    let xlsString = 
    `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:c="urn:schemas-microsoft-com:office:component:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40"
 xmlns:x2="http://schemas.microsoft.com/office/excel/2003/xml"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>GC Ambiental</Author>
  <LastAuthor>Vinicius Goulart Cardozo</LastAuthor>
  <Created>2017-07-09T17:49:32Z</Created>
  <Version>15.00</Version>
 </DocumentProperties>
 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
  <Colors>
   <Color>
    <Index>3</Index>
    <RGB>#000000</RGB>
   </Color>
   <Color>
    <Index>4</Index>
    <RGB>#006100</RGB>
   </Color>
   <Color>
    <Index>5</Index>
    <RGB>#3F3F3F</RGB>
   </Color>
   <Color>
    <Index>6</Index>
    <RGB>#3F3F76</RGB>
   </Color>
   <Color>
    <Index>7</Index>
    <RGB>#44546A</RGB>
   </Color>
   <Color>
    <Index>8</Index>
    <RGB>#4472C4</RGB>
   </Color>
   <Color>
    <Index>9</Index>
    <RGB>#5B9BD5</RGB>
   </Color>
   <Color>
    <Index>10</Index>
    <RGB>#70AD47</RGB>
   </Color>
   <Color>
    <Index>11</Index>
    <RGB>#7F7F7F</RGB>
   </Color>
   <Color>
    <Index>12</Index>
    <RGB>#8FAADC</RGB>
   </Color>
   <Color>
    <Index>13</Index>
    <RGB>#9C0006</RGB>
   </Color>
   <Color>
    <Index>14</Index>
    <RGB>#9C6500</RGB>
   </Color>
   <Color>
    <Index>15</Index>
    <RGB>#9DC3E6</RGB>
   </Color>
   <Color>
    <Index>16</Index>
    <RGB>#A5A5A5</RGB>
   </Color>
   <Color>
    <Index>17</Index>
    <RGB>#A9D18E</RGB>
   </Color>
   <Color>
    <Index>18</Index>
    <RGB>#B4C7E7</RGB>
   </Color>
   <Color>
    <Index>19</Index>
    <RGB>#BDD7EE</RGB>
   </Color>
   <Color>
    <Index>20</Index>
    <RGB>#C0C0C0</RGB>
   </Color>
   <Color>
    <Index>21</Index>
    <RGB>#C5E0B4</RGB>
   </Color>
   <Color>
    <Index>22</Index>
    <RGB>#C6EFCE</RGB>
   </Color>
   <Color>
    <Index>23</Index>
    <RGB>#C9C9C9</RGB>
   </Color>
   <Color>
    <Index>24</Index>
    <RGB>#DAE3F3</RGB>
   </Color>
   <Color>
    <Index>25</Index>
    <RGB>#DBDBDB</RGB>
   </Color>
   <Color>
    <Index>26</Index>
    <RGB>#DEEBF7</RGB>
   </Color>
   <Color>
    <Index>27</Index>
    <RGB>#E2F0D9</RGB>
   </Color>
   <Color>
    <Index>28</Index>
    <RGB>#E7E6E6</RGB>
   </Color>
   <Color>
    <Index>29</Index>
    <RGB>#ED7D31</RGB>
   </Color>
   <Color>
    <Index>30</Index>
    <RGB>#EDEDED</RGB>
   </Color>
   <Color>
    <Index>31</Index>
    <RGB>#F2F2F2</RGB>
   </Color>
   <Color>
    <Index>32</Index>
    <RGB>#F4B183</RGB>
   </Color>
   <Color>
    <Index>33</Index>
    <RGB>#F8CBAD</RGB>
   </Color>
   <Color>
    <Index>34</Index>
    <RGB>#FA7D00</RGB>
   </Color>
   <Color>
    <Index>35</Index>
    <RGB>#FBE5D6</RGB>
   </Color>
   <Color>
    <Index>36</Index>
    <RGB>#FF0000</RGB>
   </Color>
   <Color>
    <Index>37</Index>
    <RGB>#FFC000</RGB>
   </Color>
   <Color>
    <Index>38</Index>
    <RGB>#FFC7CE</RGB>
   </Color>
   <Color>
    <Index>40</Index>
    <RGB>#FFD966</RGB>
   </Color>
   <Color>
    <Index>41</Index>
    <RGB>#FFE699</RGB>
   </Color>
   <Color>
    <Index>42</Index>
    <RGB>#FFEB9C</RGB>
   </Color>
   <Color>
    <Index>43</Index>
    <RGB>#FFF2CC</RGB>
   </Color>
   <Color>
    <Index>44</Index>
    <RGB>#FFFFCC</RGB>
   </Color>
   <Color>
    <Index>45</Index>
    <RGB>#FFFFFF</RGB>
   </Color>
  </Colors>
 </OfficeDocumentSettings>
 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
  <WindowHeight>12435</WindowHeight>
  <WindowWidth>28800</WindowWidth>
  <WindowTopX>0</WindowTopX>
  <WindowTopY>0</WindowTopY>
  <ProtectStructure>False</ProtectStructure>
  <ProtectWindows>False</ProtectWindows>
 </ExcelWorkbook>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="s62" ss:Name="Default">
   <Alignment ss:Vertical="Bottom"/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#000000"/>
  </Style>
  <Style ss:ID="s65" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Font ss:FontName="Arial Narrow" ss:Size="18" ss:Color="#000000"/>
   <Interior ss:Color="#BDD7EE" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="s66" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="Arial Narrow" ss:Size="18" ss:Color="#000000"/>
   <Interior ss:Color="#BDD7EE" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="s67" ss:Parent="s62">
   <Alignment ss:Vertical="Bottom" ss:WrapText="1"/>
   <Interior ss:Color="#E7E6E6" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="s68" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Interior ss:Color="#E7E6E6" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="s69" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Interior ss:Color="#E7E6E6" ss:Pattern="Solid"/>
   <NumberFormat ss:Format="Fixed"/>
  </Style>
  <Style ss:ID="s70" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Interior ss:Color="#E7E6E6" ss:Pattern="Solid"/>
   <NumberFormat/>
  </Style>
  <Style ss:ID="s75" ss:Parent="s62">
   <Alignment ss:Vertical="Bottom" ss:WrapText="1"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="s76" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="s77" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
   <NumberFormat ss:Format="Fixed"/>
  </Style>
  <Style ss:ID="s78" ss:Parent="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
   <NumberFormat/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Areas_Contaminadas_Reabilitadas">
  <Table ss:ExpandedColumnCount="1024" x:FullColumns="1"
   x:FullRows="1" ss:StyleID="s62" ss:DefaultRowHeight="15">
   <Column ss:StyleID="s62" ss:Width="555.75"/>
   <Column ss:StyleID="s62" ss:Width="228"/>
   <Column ss:StyleID="s62" ss:Width="62.25"/>
   <Column ss:StyleID="s62" ss:Width="122.25"/>
   <Column ss:StyleID="s62" ss:Width="71.25"/>
   <Column ss:StyleID="s62" ss:Width="81.75"/>
   <Column ss:StyleID="s62" ss:Width="153.75" ss:Span="1"/>
   <Column ss:Index="9" ss:StyleID="s62" ss:Width="60" ss:Span="1015"/>
   <Row ss:AutoFitHeight="0" ss:Height="23.25">
    <Cell ss:StyleID="s65"><Data ss:Type="String">NOME</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">CIDADE</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">FUSO</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">DATUM</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">UTM_E</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">UTM_N</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">LATITUDE</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">LONGITUDE</Data></Cell>
   </Row>`
    Object.keys(cities).forEach(prop => {
        cities[prop].forEach(point => {
            xlsString += 
  `<Row ss:AutoFitHeight="0">
    <Cell ss:StyleID="${point.isGrey ? 's67' : 's75'}"><Data ss:Type="String">${point.name}</Data></Cell>
    <Cell ss:StyleID="${point.isGrey ? 's68' : 's76'}"><Data ss:Type="String">${point.city}</Data></Cell>
    <Cell ss:StyleID="${point.isGrey ? 's68' : 's76'}"><Data ss:Type="String">${point.fuso}</Data></Cell>
    <Cell ss:StyleID="${point.isGrey ? 's68' : 's76'}"><Data ss:Type="String">${point.datum}</Data></Cell>
    <Cell ss:StyleID="${point.isGrey ? 's69' : 's77'}"><Data ss:Type="String">${point.utm_e}</Data></Cell>
    <Cell ss:StyleID="${point.isGrey ? 's69' : 's77'}"><Data ss:Type="String">${point.utm_n}</Data></Cell>
    <Cell ss:StyleID="${point.isGrey ? 's70' : 's78'}"><Data ss:Type="String">${point.latitude}</Data></Cell>
    <Cell ss:StyleID="${point.isGrey ? 's70' : 's78'}"><Data ss:Type="String">${point.longitude}</Data></Cell>
   </Row>`
        })
    })
    
    xlsString +=
`</Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Header x:Margin="0.4921259845"/>
    <Footer x:Margin="0.4921259845"/>
    <PageMargins x:Bottom="0.984251969" x:Left="0.78740157499999996"
     x:Right="0.78740157499999996" x:Top="0.984251969"/>
   </PageSetup>
   <Unsynced/>
   <Selected/>
   <FreezePanes/>
   <FrozenNoSplit/>
   <SplitHorizontal>1</SplitHorizontal>
   <TopRowBottomPane>1</TopRowBottomPane>
   <ActivePane>2</ActivePane>
   <Panes>
    <Pane>
     <Number>3</Number>
    </Pane>
    <Pane>
     <Number>2</Number>
     <ActiveRow>9</ActiveRow>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
  <x:WorksheetOptions/>
 </Worksheet>
</Workbook>`

    let name = `${filePath}/Areas_Contaminadas_Reabilitadas.xls`
    _writeFile(xlsString,name)
}

module.exports = {
    KMLService,
    XLSService
}