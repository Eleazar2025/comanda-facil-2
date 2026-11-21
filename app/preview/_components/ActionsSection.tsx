import { LuEye, LuPencil, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import PreviewSection from "./PreviewSection";
import PreviewVariant from "./PreviewVariant";

export default function ActionsSection() {
  return (
    <>
      <PreviewSection title="Button">
        <PreviewVariant label='variant="primary"'>
          <Button />
        </PreviewVariant>
        <PreviewVariant label='variant="secondary"'>
          <Button variant="secondary" />
        </PreviewVariant>
        <PreviewVariant label='variant="ghost"'>
          <Button variant="ghost" />
        </PreviewVariant>
        <PreviewVariant label='variant="danger"'>
          <Button variant="danger" />
        </PreviewVariant>
        <PreviewVariant label="disabled (primary)">
          <Button disabled />
        </PreviewVariant>
        <PreviewVariant label="disabled (secondary)">
          <Button variant="secondary" disabled />
        </PreviewVariant>
        <PreviewVariant label="disabled (ghost)">
          <Button variant="ghost" disabled />
        </PreviewVariant>
        <PreviewVariant label="disabled (danger)">
          <Button variant="danger" disabled />
        </PreviewVariant>
        <PreviewVariant label='size="sm"'>
          <Button size="sm">Pequeno</Button>
        </PreviewVariant>
        <PreviewVariant label='href (renderiza um Link)'>
          <Button href="/preview">Ir para a prévia</Button>
        </PreviewVariant>
        <PreviewVariant label="icon">
          <Button icon={LuPlus}>Novo pedido</Button>
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="IconButton">
        <PreviewVariant label='tone="default" (editar)'>
          <IconButton icon={LuPencil} label="Editar" />
        </PreviewVariant>
        <PreviewVariant label='tone="default" (ver)'>
          <IconButton icon={LuEye} label="Ver" />
        </PreviewVariant>
        <PreviewVariant label='tone="danger"'>
          <IconButton icon={LuTrash2} label="Excluir" tone="danger" />
        </PreviewVariant>
        <PreviewVariant label="disabled">
          <IconButton icon={LuPencil} label="Editar" disabled />
        </PreviewVariant>
        <PreviewVariant label='shape="round"'>
          <IconButton icon={LuX} label="Fechar" shape="round" />
        </PreviewVariant>
      </PreviewSection>
    </>
  );
}
