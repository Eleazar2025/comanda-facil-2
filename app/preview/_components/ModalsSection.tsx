import ConfirmationModal from "../../components/ConfirmationModal";
import ModalContainer from "../../components/ModalContainer";
import PreviewSection from "./PreviewSection";
import PreviewVariant from "./PreviewVariant";

export default function ModalsSection() {
  return (
    <>
      <PreviewSection title="ModalContainer">
        <PreviewVariant label="default" className="w-full max-w-md">
          <ModalContainer title="Título do Modal">Conteúdo do modal</ModalContainer>
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="ConfirmationModal">
        <PreviewVariant label="default" className="w-full max-w-sm">
          <ConfirmationModal
            title="Excluir Produto?"
            message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
          />
        </PreviewVariant>
      </PreviewSection>
    </>
  );
}
