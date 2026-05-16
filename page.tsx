import { createClient } from '@/utils/supabase/server'

export default async function ItensPage() {
  const supabase = await createClient()
  const { data: itens, error } = await supabase
    .from('itens_solidarios')
    .select('*')
    .order('data_postagem', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-2">Saúde Pet</h1>
        <p className="text-gray-600 mb-8">Medicamentos e acessórios doados pela comunidade.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {itens?.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 border border-emerald-100">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 uppercase mb-4">
                {item.tipo}
              </span>
              <h2 className="text-xl font-bold text-gray-800">{item.nome_item}</h2>
              <p className="text-gray-600 text-sm mt-2">{item.descricao}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-600">● {item.status}</span>
                <button className="text-xs bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
                  Tenho interesse
                </button>
              </div>
            </div>
          ))}
        </div>
        {(!itens || itens.length === 0) && <p className="text-center py-20 text-gray-400">Nenhum item disponível no momento.</p>}
      </div>
    </div>
  )
}
