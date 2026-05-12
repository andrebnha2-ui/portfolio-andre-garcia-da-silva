# 🔍 ExifInfo.org - OSINT Metadata Extractor

## 📝 Descrição do Projeto
Este projeto é uma ferramenta avançada de **OSINT (Open Source Intelligence)** focada na extração e análise de camadas profundas de metadados em imagens. O objetivo principal é fornecer investigadores, entusiastas de segurança e profissionais de tecnologia uma interface rápida e segura para identificar informações ocultas em arquivos digitais, como coordenadas GPS, configurações de câmera, datas de criação e histórico de edição.

Desenvolvido com uma estética **"Mission Control"**, o sistema permite o processamento tanto de arquivos locais via drag-and-drop quanto de URLs remotas, garantindo a integridade dos dados e oferecendo persistência de histórico para usuários autenticados via Firebase.

![Dashboard Principal do ExifInfo](https://ais-pre-muvkzdqbtbacpeamrnmsef-621693441277.us-east1.run.app/og-image.png)
*Figura 1: Dashboard técnico do sistema exibindo a extração de metadados em tempo real.*

## 🚀 Tecnologias Utilizadas
* **Framework:** React 18 (Vite)
* **Linguagem:** TypeScript
* **Backend & Auth:** Firebase (Cloud Firestore & Authentication)
* **Estilização:** Tailwind CSS (Modern Tech UI)
* **Acessibilidade:** Integração VLibras (Governo Federal)
* **Internacionalização:** i18n Nativo (Suporte PT, EN, ZH)

## 📊 Resultados e Aprendizados
O projeto evoluiu de um simples extrator de EXIF para uma plataforma completa de gerenciamento de metadados.
* **Segurança e Privacidade:** Implementação de processamento híbrido, garantindo que a análise inicial seja rápida e segura.
* **Persistência em Tempo Real:** Utilização do Firestore para sincronização instantânea do histórico de buscas entre múltiplos dispositivos.
* **Inclusão Digital:** Integração total com o VLibras para acessibilidade, permitindo que o conteúdo técnico seja consumido por pessoas surdas.
* **Design Sistêmico:** Criação de uma linguagem visual coesa que remete a consoles de monitoramento profissional.

![Arquitetura de Dados](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000)
*Figura 2: Visualização da estrutura de dados e pipeline de metadados.*

## 🔧 Como Executar
1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
