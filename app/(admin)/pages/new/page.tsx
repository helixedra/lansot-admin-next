"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button, Checkbox, Input } from "@/components/jump-ui";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/services/pages/getPage";
import { Tabs, Tab } from "@/components/shared/Tabs";
import Link from "next/link";
import { Textarea } from "@/components/jump-ui/components/Textarea";
import { addPage } from "@/services/pages/addPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocales } from "@/services/getLocales";

export default function PagePage() {
  // const { slug: slugParam } = useParams();

  const [form, setForm] = React.useState({} as any);
  // const [blocks, setBlocks] = React.useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    await mutateAsync({ data: form });
  };

  const queryClient = useQueryClient();

  // const { data: page, isLoading } = useQuery({
  //   queryKey: ["page", slugParam],
  //   queryFn: () => getPage(slugParam as string),
  // });

  const { data: locales, isLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: getLocales,
  });

  // const locales = page?.map((page) => page.locale);

  React.useEffect(() => {
    if (locales) {
      const globalPage = {
        name: "",
        slug: "",
      };
      const localePage = locales.reverse().reduce(
        (acc, page) => ({
          ...acc,
          [page.slug!]: {
            locale: page.slug,
            meta: {
              title: "",
              description: "",
            },
          },
        }),
        {}
      );
      setForm({ ...globalPage, locales: { ...localePage } });
    }
  }, [locales]);

  console.log("form", form);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ data }: { data: any }) => {
      const res = await addPage({ data });
      return res;
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //   return;
  return (
    <div>
      <div>
        <Link href="/pages">Back</Link>
      </div>

      <div className="flex flex-col gap-8 max-w-md mx-auto">
        <Input
          type="text"
          name="name"
          label="Name"
          value={form?.name || ""}
          onChange={(e) => {
            setForm((prev: any) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        <Input
          type="text"
          name="slug"
          label="Slug"
          value={form?.slug || ""}
          onChange={(e) => {
            setForm((prev: any) => ({
              ...prev,
              slug: e.target.value,
            }));
          }}
        />
        <Tabs>
          {locales?.map((locale) => (
            <Tab key={locale.slug} label={locale.slug}>
              <Input
                type="text"
                name="title"
                label="Meta Title"
                value={form?.locales?.[locale.slug]!.meta?.title || ""}
                onChange={(e) => {
                  setForm((prev: any) => ({
                    ...prev,
                    locales: {
                      ...prev.locales,
                      [locale.slug!]: {
                        ...prev.locales[locale.slug!],
                        meta: {
                          ...prev.locales[locale.slug!].meta,
                          title: e.target.value,
                        },
                      },
                    },
                  }));
                }}
              />
            </Tab>
          ))}
        </Tabs>
        <Tabs>
          {locales?.map((locale) => (
            <Tab key={locale.slug} label={locale.slug}>
              <Textarea
                name="description"
                label="Meta Description"
                value={form?.locales?.[locale.slug]!.meta?.description || ""}
                onChange={(e) => {
                  setForm((prev: any) => ({
                    ...prev,
                    locales: {
                      ...prev.locales,
                      [locale.slug!]: {
                        ...prev.locales[locale.slug!],
                        meta: {
                          ...prev.locales[locale.slug!].meta,
                          description: e.target.value,
                        },
                      },
                    },
                  }));
                }}
              />
            </Tab>
          ))}
        </Tabs>
        {/* <Button>Add Block</Button>

        <Tabs>
          {page?.map((page) => (
            <Tab key={page.id} label={page.locale!}>
              <Block page={page} form={form} setForm={setForm} />
            </Tab>
          ))}
        </Tabs> */}
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}

// export function Block({
//   page,
//   form,
//   setForm,
// }: {
//   page: any;
//   form: any;
//   setForm: any;
// }) {
//   const [image, setImage] = React.useState<File | null>(null);
//   const [isImage, setIsImage] = React.useState(false);
//   return (
//     <div className="flex flex-col gap-2">
//       <Input
//         type="text"
//         name="name"
//         label="Name"
//         value={form?.blocks?.name || ""}
//         onChange={(e) => {
//           setForm((prev: any) => ({
//             ...prev,
//             blocks: {
//               ...prev.blocks,
//               name: e.target.value,
//             },
//           }));
//         }}
//       />
//       <Input
//         type="text"
//         name="title"
//         label="Title"
//         value={form?.[page.locale!]?.blocks?.title || ""}
//         onChange={(e) => {
//           setForm((prev: any) => ({
//             ...prev,
//             [page.locale!]: {
//               ...prev[page.locale!],
//               blocks: {
//                 ...prev[page.locale!].blocks,
//                 title: e.target.value,
//               },
//             },
//           }));
//         }}
//       />
//       <Input
//         type="text"
//         name="content"
//         label="Content"
//         value={form?.[page.locale!]?.blocks?.content || ""}
//         onChange={(e) => {
//           setForm((prev: any) => ({
//             ...prev,
//             [page.locale!]: {
//               ...prev[page.locale!],
//               blocks: {
//                 ...prev[page.locale!].blocks,
//                 content: e.target.value,
//               },
//             },
//           }));
//         }}
//       />
//       <Checkbox
//         label="Image"
//         checked={isImage}
//         onChange={() => setIsImage((prev) => !prev)}
//       />
//       {isImage && (
//         <>
//           <Input
//             type="file"
//             name="image"
//             label="Image"
//             onChange={(e) =>
//               setForm((prev: any) => ({
//                 ...prev,
//                 blocks: {
//                   ...prev.blocks,
//                   image: e.target.files?.[0],
//                 },
//               }))
//             }
//           />
//           <Input
//             type="text"
//             name="imageAlt"
//             label="Image Alt"
//             onChange={(e) =>
//               setForm((prev: any) => ({
//                 ...prev,
//                 [page.locale!]: {
//                   ...prev[page.locale!],
//                   blocks: {
//                     ...prev[page.locale!].blocks,
//                     imageAlt: e.target.value,
//                   },
//                 },
//               }))
//             }
//           />
//           <Input
//             type="text"
//             name="imageTitle"
//             label="Image Title"
//             onChange={(e) =>
//               setForm((prev: any) => ({
//                 ...prev,
//                 [page.locale!]: {
//                   ...prev[page.locale!],
//                   blocks: {
//                     ...prev[page.locale!].blocks,
//                     imageTitle: e.target.value,
//                   },
//                 },
//               }))
//             }
//           />
//         </>
//       )}
//     </div>
//   );
// }
