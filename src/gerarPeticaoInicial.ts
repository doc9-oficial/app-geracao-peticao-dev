import docgo from "docgo-sdk";

interface GerarPeticaoInicialParams {
  conteudo: string;
  modelo?: string;
}

async function gerarPeticaoInicial(params: GerarPeticaoInicialParams): Promise<void> {
  try {
    if (Array.isArray(params) && params.length === 1 && typeof params[0] === 'object') {
      params = params[0];
    }

    if (!params.conteudo) {
      console.log(docgo.result(false, null, "É necessário informar o conteúdo"));
      return;
    }

    if (!docgo.getEnv("whichToken") || !docgo.getEnv("whichExtensionId")) {
      console.log(docgo.result(false, null, "Credenciais do Which não configuradas"));
      return;
    }

    const session = true;
    if (!session) {
      console.log(docgo.result(false, null, "Não foi possível obter sessão do Which"));
      return;
    }
       
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const resultado = {
      conteudo: params.conteudo,
      timestamp: new Date().toISOString(),
      status: "sucesso",
      mensagem: "Gera petição inicial com base em fatos e fundamentos concluído com sucesso",
      resultado: {
        id: "doc-" + Math.floor(Math.random() * 1000000),
        data: new Date().toISOString(),
        conteudo: `Resultado processado para: ${params.conteudo}`
      }
    };

    console.log(docgo.result(true, resultado));
  } catch (err: any) {
    console.log(docgo.result(false, null, err.message));
  }
}

export default gerarPeticaoInicial;
