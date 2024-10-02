export default function Mobile() {
  return(
    <div className="w-full h-auto flex justify-center items-start text-black relative">
      <div className="w-full h-auto flex justify-center items-center mt-16 overflow-hidden">
        <div className="w-[90%] h-auto flex flex-col text-center justify-center items-center gap-12">
          <h1 className="text-xl font-bold">Política de Privacidade e Cookies</h1>
          <span className="text-sm font-serif">
            Esta Política de Privacidade e Cookies descreve como coletamos, usamos e protegemos as informações pessoais dos visitantes de nosso site, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </span>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5 justify-center">
              <h2 className="text-lg font-semibold">Coleta de Dados Pessoais</h2>
              <p className="text-sm">
                Coletamos e utilizamos dados pessoais dos usuários de forma limitada e para finalidades específicas. Os dados coletados podem incluir:
              </p>
              <ul className="w-full flex flex-col items-start list-disc ml-[10px] text-sm text-start">
                <li>Nome;</li>
                <li>Endereço de e-mail;</li>
                <li>Informações de navegação (via cookies).</li>
              </ul>
            </div>
            <div className="flex flex-col gap-5 justify-center">
              <h2 className="text-lg font-semibold">Uso dos Dados Pessoais</h2>
              <p className="text-sm">
                Os dados pessoais coletados são utilizados para as seguintes finalidades:
              </p>
              <ul className="w-full flex flex-col items-start list-disc ml-[10px] text-sm text-start">
                <li>Fornecer e melhorar os serviços oferecidos no site;</li>
                <li>Responder a solicitações de contato;</li>
                <li>Enviar comunicações de marketing, se o consentimento for dado.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-5 justify-center">
              <h2 className="text-lg font-semibold">Compartilhamento de Dados Pessoais</h2>
              <p className="text-sm">
                Nós não compartilhamos os dados pessoais com terceiros, exceto nos casos em que:
              </p>
              <ul className="w-full flex flex-col items-start list-disc ml-[10px] text-sm text-start">
                <li>Haja exigência legal</li>
                <li>For necessário para a execução dos serviços solicitados pelos usuários</li>
              </ul>
            </div>
            <div className="flex flex-col gap-5 justify-center">
              <h2 className="text-lg font-semibold">Direitos do Usuário</h2>
              <p className="text-sm">
                De acordo com a LGPD, você tem o direito de:
              </p>
              <ul className="w-full flex flex-col items-start list-disc ml-[10px] text-sm text-start">
                <li>Solicitar acesso aos seus dados pessoais;</li>
                <li>Corrigir dados incorretos;</li>
                <li>Solicitar a exclusão dos seus dados;</li>
                <li>Revogar o consentimento a qualquer momento.</li>
              </ul>
              <span className="text-sm font-serif">
                Para exercer esses direitos, entre em contato conosco através do e-mail: [seu-email@exemplo.com].
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h2 className="text-ls font-semibold">Cookies</h2>
              <p className="text-sm">
                Utilizamos cookies para melhorar a experiência do usuário em nosso site. Um cookie é um pequeno arquivo de texto que é armazenado no dispositivo do usuário e pode conter informações sobre sua navegação.
              </p>
            </div>
            <div className="flex flex-col gap-5 justify-center">
              <h2 className="text-lg font-semibold">Tipos de Cookies que Utilizamos:</h2>
              <ul className="w-full flex flex-col items-start list-decimal text-sm text-start ml-[10px]">
                <li>Cookies Essenciais: Necessários para o funcionamento do site.</li>
                <li>Cookies de Desempenho: Utilizados para analisar como os usuários utilizam o site e melhorar o desempenho.</li>
                <li>Cookies de Funcionalidade: Permitem lembrar preferências do usuário e fornecer funcionalidades avançadas.</li>
                <li>Cookies de Publicidade: Usados para fornecer anúncios relevantes aos usuários, com base em seus interesses.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold">Gerenciamento de Cookies:</h2>
              <p className="text-sm">
                Você pode gerenciar as preferências de cookies diretamente em seu navegador. No entanto, ao desativar certos tipos de cookies, a funcionalidade do site pode ser prejudicada.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold">Segurança dos Dados</h2>
              <p className="text-sm">
                Adotamos medidas de segurança apropriadas para proteger os dados pessoais dos usuários contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold">Alterações na Política</h2>
              <p className="text-sm">
                Podemos atualizar esta Política de Privacidade e Cookies periodicamente. Qualquer alteração será publicada nesta página com a data da última revisão.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold">Contato</h2>
              <p className="text-sm">
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade e Cookies, entre em contato conosco em: [seu-email@exemplo.com].
              </p>
            </div>
          </div>
          <span className="w-screen h-[100%] text-sm font-serif pt-14 rounded-b-[60px] bg-[var(--background)] relative z-20 pb-8">
            Data da última atualização: 01/10/2024
          </span>
        </div>
      </div>
    </div>
  )
}
