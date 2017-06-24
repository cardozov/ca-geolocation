# CA Geolocation

## Descrição
Aplicação Modular com Electron estruturada semanticamente em áreas


## Requisitos ambiente desenvolvimento
- NPM
- Electron ( preferencialmente 1.7.1 )
- Gulp

## Estrutura do Projeto

[Guidelines Estrutura do Projeto](https://docs.google.com/a/medgrupo.com.br/document/d/1E74HzqggBFEaP0KhCz0FB_6yymEneTPxRla9Fd-zy_Y/edit?usp=sharing "Estrutura do Projeto")

## Mecanismos de controle e qualidade

[Guidelines Mecanismos de controle e qualidade](https://docs.google.com/a/medgrupo.com.br/document/d/1bILLkbjKtbnS9xbH9S27zD_F5FsQUbVb1V1btwDqCKg/edit?usp=sharing "Mecanismos de controle e qualidade")

## Workflow Git

[Guidelines  Workflow Git](https://docs.google.com/a/medgrupo.com.br/document/d/1m2dMAIeoEIfow70hEDMqGHxD5WFN-0n8LeeE6DXEsOY/edit?usp=sharing "Guia Workflow Git")

## Build do projeto

1. git clone https://github.com/viniciusgcardozo/ca-geolocation.git
2. npm install
3. npm start

## Export/Publish do projeto

### Para uma plataforma (Windows)
1. Adicionar um icone .png no **mesmo nível** da pasta do projeto
2. Executar o comando no **mesmo nível** da pasta do projeto ```electron-packager ./ca-geolocation/ ca-geolocation --platform=win32 --arch=x64 --icon=./icon.png```

### Para todas as plataformas
1. Converter um icone base (png) [neste site](https://iconverticons.com/online/)
2. Criar uma pasta com todas as extensões de icones (todos com o mesmo nome) no **mesmo nível** da pasta do projeto
3. Executar o comando no **mesmo nível** da pasta do projeto ```electron-packager ./ca-geolocation/ ca-geolocation --platform=all --arch=x64 --icon=./icons/icon```

 **Desenv 2017** Corcurex
