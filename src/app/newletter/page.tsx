// 'use client';

// import type React from 'react';
// import { useState, useEffect } from 'react';
// import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export default function NewsletterPage() {
//     const [email, setEmail] = useState('');
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);

//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         setIsLoading(false);
//         setIsSubmitted(true);
//     };

//     if (isSubmitted) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-[#7BA3E8] via-[#A8D5C3] to-[#C8E896] flex items-center justify-center p-4">
//                 <div className="max-w-md w-full">
//                     <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
//                         <div className="flex justify-center mb-6">
//                             <div className="w-16 h-16 bg-[#D7FB9E] rounded-full flex items-center justify-center">
//                                 <CheckCircle className="h-8 w-8 text-[#0F1729]" />
//                             </div>
//                         </div>

//                         <h2 className="text-3xl font-bold text-[#0F1729] mb-4">
//                             Merci pour votre inscription !
//                         </h2>

//                         <p className="text-gray-600 mb-8">
//                             Vous recevrez bientôt un email de confirmation.
//                             Restez à l'écoute pour découvrir en avant-première
//                             nos nouvelles opportunités d'investissement.
//                         </p>

//                         <Button
//                             onClick={() => (window.location.href = '/')}
//                             className="bg-[#618EFF] hover:bg-[#0F1729] text-white rounded-full px-8 py-3 font-medium transition-all duration-300 w-full"
//                         >
//                             Retour à l'accueil
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#7BA3E8] via-[#A8D5C3] to-[#C8E896] p-4">
//             <div className="max-w-7xl mx-auto pt-32 px-4">
//                 <Button
//                     onClick={() => (window.location.href = '/')}
//                     variant="ghost"
//                     className="text-[#0F1729] hover:text-[#618EFF] hover:bg-white/50 text-base font-medium"
//                 >
//                     <ArrowLeft className="h-5 w-5 mr-2" />
//                     Retour
//                 </Button>
//             </div>

//             <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
//                 <div className="max-w-md w-full">
//                     <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
//                         <div className="flex justify-center mb-6">
//                             <div className="w-16 h-16 bg-[#D7FB9E] rounded-full flex items-center justify-center">
//                                 <Mail className="h-8 w-8 text-[#0F1729]" />
//                             </div>
//                         </div>

//                         <h1 className="text-3xl font-bold text-[#0F1729] mb-3 text-center">
//                             Accédez en avant-première
//                         </h1>

//                         <p className="text-gray-600 mb-8 text-center">
//                             Inscrivez-vous à notre newsletter pour être informé
//                             en priorité de nos nouvelles opportunités
//                             d'investissement et recevoir nos conseils exclusifs.
//                         </p>

//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="block text-sm font-medium text-gray-700 mb-2"
//                                 >
//                                     Adresse email
//                                 </label>
//                                 <input
//                                     id="email"
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="votre@email.com"
//                                     required
//                                     className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#618EFF] focus:border-transparent transition-all"
//                                 />
//                             </div>

//                             <Button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className="bg-[#618EFF] hover:bg-[#0F1729] text-white rounded-full px-8 py-3 font-medium transition-all duration-300 w-full disabled:opacity-50"
//                             >
//                                 {isLoading
//                                     ? 'Inscription en cours...'
//                                     : "S'inscrire à la newsletter"}
//                             </Button>
//                         </form>

//                         <p className="text-xs text-gray-500 mt-6 text-center">
//                             En vous inscrivant, vous acceptez de recevoir nos
//                             emails. Vous pouvez vous désinscrire à tout moment.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
