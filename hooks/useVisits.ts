import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useVisits = () => {
   const [visits, setVisits] = useState<number>(0);

   useEffect(() => {
      const key = 'visited-portfolio';

      const fetchVisits = async () => {
         // 👇 1. Obtener valor actual
         const { data, error } = await supabase
            .from('visits')
            .select('count')
            .eq('id', 1)
            .single();

         console.log('DATA:', data);
         console.log('ERROR:', error);

         if (error || !data) return;

         console.log('LOCALSTORAGE:', localStorage.getItem(key));

         // 👇 primero intentamos incrementar si corresponde
         if (!localStorage.getItem(key)) {
            const { error: updateError } = await supabase
               .from('visits')
               .update({ count: data.count + 1 })
               .eq('id', 1);

            console.log('UPDATE ERROR:', updateError);

            if (!updateError) {
               localStorage.setItem(key, 'true');
               setVisits(data.count + 1);
               return; // 👈 importante cortar acá
            }
         }

         // 👇 si no incrementa, mostramos valor actual
         setVisits(data.count);
      };

      fetchVisits();
   }, []);

   return visits;
};
