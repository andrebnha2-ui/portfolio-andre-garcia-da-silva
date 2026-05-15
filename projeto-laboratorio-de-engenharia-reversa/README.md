# 🔍 Exif Info.org Clone - OSINT Metadata Analyzer

## 📝 Descrição do Projeto
Este projeto é uma ferramenta de **Inteligência de Fontes Abertas (OSINT)** poderosa e minimalista, projetada para a extração e análise profunda de metadados (EXIF) de imagens. Inspirado no consagrado *exifinfo.org*, este clone foca em uma experiência de usuário técnica e direta, permitindo que analistas e entusiastas descubram informações ocultas em arquivos de mídia.

O objetivo principal é fornecer transparência sobre os dados contidos em fotos, como coordenadas GPS, configurações da câmera (ISO, abertura), data de criação e software de edição utilizado, ajudando a verificar a autenticidade e a origem de arquivos digitais.

![Dashboard Principal](https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200)
*Figura 1: Interface principal do sistema com foco em tipografia técnica e alta legibilidade.*

## 🚀 Tecnologias Utilizadas
*   **Linguagem:** TypeScript
*   **Framework:** React 19 + Vite
*   **Estilização:** Tailwind CSS (Custom Dark Theme: `#002b36`)
*   **Bibliotecas:** 
    *   `ExifReader` (Motor de extração robusto)
    *   `Lucide React` (Iconografia funcional)
    *   `Motion` (Transições suaves de UI)
*   **Tipografia:** BerkeleyMono (JetBrains Mono via Google Fonts)

## 📊 Resultados e Funcionalidades
O projeto entrega uma solução de análise em tempo real com alta precisão:
*   **Análise Híbrida:** Suporte completo para upload de arquivos locais e processamento de imagens via URL.
*   **Visualização Técnica:** Tabela de metadados organizada por tags, valores e tipos, facilitando a leitura de grandes volumes de informação.
*   **UI/UX OSINT:** Design otimizado para operações de longa duração, utilizando uma paleta de cores solarizada que reduz o cansaço visual.
*   **Extração Completa:** Capacidade de ler tags EXIF, IPTC, XMP e muito mais, garantindo que nenhum detalhe passe despercebido.

![Análise de Metadados](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)
*Figura 2: Exemplo de extração de metadados técnicos de uma imagem digital.*

## 🔧 Como Executar
Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/usuario/exif-info-clone.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    Acesse `http://localhost:3000` para começar a analisar.

![Pipeline de Dados](https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200)
*Figura 3: Representação do fluxo de processamento de dados do cliente até a extração final.*
