import os
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
# These are the modern paths
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

class SECRAG:
    def __init__(self):
        self.persist_dir = "chroma_db"
        self.embeddings = OpenAIEmbeddings()
        self.llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

        self.vectorstore = Chroma(
            persist_directory=self.persist_dir,
            embedding_function=self.embeddings
        )

        system_prompt = (
            "Use the following pieces of context to answer the user's question. "
            "If you don't know the answer, just say that you don't know. "
            "\n\n"
            "{context}"
        )

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])

        combine_docs_chain = create_stuff_documents_chain(self.llm, prompt)
        self.rag_chain = create_retrieval_chain(
            self.vectorstore.as_retriever(), 
            combine_docs_chain
        )

    def add_pdf(self, pdf_path: str):
        loader = PyPDFLoader(pdf_path)
        docs = loader.load()
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = splitter.split_documents(docs)
        self.vectorstore.add_documents(chunks)

    def ask(self, question: str):
        result = self.rag_chain.invoke({"input": question})
        return result["answer"]