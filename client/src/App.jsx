import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false);

  // Validation login
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Champ requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Champ requis"),
  });

  // Validation register
  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Champ requis"),
    email: Yup.string().email("Email invalide").required("Champ requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Champ requis"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("Champ requis"),
  });

  // Handlers
  const handleLoginSubmit = (values) => {
    console.log("Données valides:", values);
  };

  const handleRegisterSubmit = (values) => {
    console.log("Données d'inscription valides:", values);
  };

  return (
    <>
      {/* Formulaire */}
      <div className="flex justify-center items-center h-screen bg-[#1f2937]">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          {isRegister ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Créer un compte
              </h2>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegisterSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-6">
                    {/* Username */}
                    <div>
                      <label className="flex items-center text-gray-300">
                        <UserIcon className="h-5 w-5 mr-2" /> Nom d'utilisateur
                      </label>
                      <Field
                        name="username"
                        type="text"
                        className={`w-full p-2 mt-1 rounded-md bg-gray-700 text-white border ${
                          errors.username && touched.username
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950`}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center text-gray-300">
                        <EnvelopeIcon className="h-5 w-5 mr-2" /> Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`w-full p-2 mt-1 rounded-md bg-gray-700 text-white border ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="flex items-center text-gray-300">
                        <LockClosedIcon className="h-5 w-5 mr-2" /> Mot de passe
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className={`w-full p-2 mt-1 rounded-md bg-gray-700 text-white border ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950`}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="flex items-center text-gray-300">
                        <LockClosedIcon className="h-5 w-5 mr-2" /> Confirmer le
                        mot de passe
                      </label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={`w-full p-2 mt-1 rounded-md bg-gray-700 text-white border ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950`}
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Bouton */}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                    >
                      S'inscrire
                    </button>
                  </Form>
                )}
              </Formik>
              <p className="mt-4 text-center text-gray-400">
                Déjà un compte ?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-blue-400 hover:underline"
                >
                  Connectez-vous
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Connexion
              </h2>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLoginSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="flex items-center text-gray-300">
                        <EnvelopeIcon className="h-5 w-5 mr-2" /> Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`w-full p-2 mt-1 rounded-md bg-gray-700 text-white border ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="flex items-center text-gray-300">
                        <LockClosedIcon className="h-5 w-5 mr-2" /> Mot de passe
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className={`w-full p-2 mt-1 rounded-md bg-gray-700 text-white border ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950`}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Bouton */}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                    >
                      Se connecter
                    </button>
                  </Form>
                )}
              </Formik>
              <p className="mt-4 text-center text-gray-400">
                Pas de compte ?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-blue-400 hover:underline"
                >
                  Créez-en un
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
