export type FiltrosKpi = {
  desde: string; // AAAA-MM-DD, incluido
  hasta: string; // AAAA-MM-DD, incluido
  usuario?: number;
};

export function filtroUsuario(parametros: unknown[], usuario?: number): string {
  if (usuario === undefined) return '';

  parametros.push(usuario);
  return `AND EXISTS(

   SELECT 1 FROM "TBL_Requests_Assignments" a
    WHERE a."Request_Assignment_ID" = r."Request_ID"
      AND a."Request_Assignment_User_ID" = $${parametros.length}
  )`;
}
