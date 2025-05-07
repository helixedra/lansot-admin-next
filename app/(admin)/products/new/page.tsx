"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button, Checkbox, Input } from "@/components/jump-ui";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/services/pages/getPage";
import { Tabs, Tab } from "@/components/shared/Tabs";
import Link from "next/link";
import { Textarea } from "@/components/jump-ui/components/Textarea";
import { addBlock } from "@/services/blocks/addBlock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocales } from "@/services/getLocales";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [collection, setCollection] = React.useState("");
  const [popular, setPopular] = React.useState(false);
  const [top, setTop] = React.useState(true);
  const [showroom, setShowroom] = React.useState(false);
  const [description, setDescription] = React.useState([]);
  const [cover, setCover] = React.useState(
    [] as { id: string; path: string }[]
  );
  const [promo, setPromo] = React.useState([]);
  const [drawings, setDrawings] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [price, setPrice] = React.useState("");

  const [form, setForm] = React.useState({} as any);
  const [galleryDialog, setGalleryDialog] = React.useState({
    cover: false,
    topImage: false,
    drawings: false,
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // await mutateAsync({ data: form, image: selectedImage?.id });
    // router.push("/blocks");
  };

  // const removeImage = () => {
  //   setSelectedImage(null);
  //   setImage(null);
  // };

  const queryClient = useQueryClient();

  // const { data: page, isLoading } = useQuery({
  //   queryKey: ["page", slugParam],
  //   queryFn: () => getPage(slugParam as string),
  // });

  const { data: locales, isLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: getLocales,
  });

  // const slugBuilder = (name: string) => {
  //   const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  //   return slug;
  // };

  // const locales = page?.map((page) => page.locale);

  React.useEffect(() => {
    if (locales) {
      const global = {
        name: "",
        slug: "",
        category: "",
        collection: "",
        popular: false,
        top: true,
        showroom: false,
        cover: [], // img id
        top_image: [], // img id
        promo: [], // {type: "col-1", images: [{img: "", alt: {uk: "", en: ""}}]}
        drawings: [], // img ids
        models: [], // {title: "", file: ""}
        price: "",
      };
      const localed = locales.reverse().reduce(
        (acc, locale) => ({
          ...acc,
          [locale.slug!]: {
            locale: locale.slug,
            type: "",
            meta: {
              title: "",
              description: "",
            },
            description: "",
          },
        }),
        {}
      );
      setForm({ ...global, locales: { ...localed } });
    }
  }, [locales]);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ data, image }: { data: any; image?: string }) => {
      const res = await addBlock({ data, image });
      return res;
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log("selectedImage", selectedImage);
  //   return;

  console.log("cover", cover);
  console.log("drawings", drawings);

  return (
    <div>
      <div className="flex flex-col gap-8 max-w-md mx-auto">
        <Input
          name="name"
          label="Name"
          value={name || ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          name="slug"
          label="Slug"
          value={slug || ""}
          onChange={(e) => {
            setSlug(e.target.value);
          }}
        />
        <Input
          name="category"
          label="Category"
          value={category || ""}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <Input
          name="collection"
          label="Collection"
          value={collection || ""}
          onChange={(e) => {
            setCollection(e.target.value);
          }}
        />
        <Checkbox
          label="Popular"
          checked={popular}
          onChange={(e: any) => {
            setPopular(e.target.checked);
          }}
        />
        <Checkbox
          label="Top"
          checked={top}
          onChange={(e: any) => {
            setTop(e.target.checked);
          }}
        />
        <Checkbox
          label="Showroom"
          checked={showroom}
          onChange={(e: any) => {
            setShowroom(e.target.checked);
          }}
        />
        {/* DESCRIPTIONS */}
        <Tabs>
          {locales?.map((locale) => (
            <Tab key={locale.slug} label={locale.slug}>
              <Textarea
                name="description"
                label="Description"
                rows={10}
                value={description?.[locale.slug as any] || ""}
                onChange={(e) => {
                  setDescription((prev: any) => ({
                    ...prev,
                    [locale.slug as string]: e.target.value,
                  }));
                }}
              />
            </Tab>
          ))}
        </Tabs>
        {/* COVER IMAGE */}
        <div className="flex items-center gap-2">
          <div>Cover</div>
          {cover.length ? (
            <div className="flex items-center gap-2">
              <Image src={cover[0].path} width={100} height={100} alt="" />
              <Button onClick={() => setCover([])}>
                <RiDeleteBin2Line />
              </Button>
            </div>
          ) : (
            <Button
              onClick={() =>
                setGalleryDialog({ ...galleryDialog, cover: true })
              }
            >
              Add Image
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div>Drawings</div>
          {drawings?.length ? (
            <div className="flex items-center gap-2">
              {drawings.map((drawing: any) => (
                <Image
                  src={drawing.path}
                  width={100}
                  height={100}
                  alt=""
                  key={drawing.id}
                />
              ))}
              <Button onClick={() => setDrawings([])}>
                <RiDeleteBin2Line />
              </Button>
            </div>
          ) : (
            <Button
              onClick={() =>
                setGalleryDialog({ ...galleryDialog, drawings: true })
              }
            >
              Add Image
            </Button>
          )}
        </div>

        {galleryDialog.cover && (
          <>
            <Gallery
              selectedImages={cover}
              setSelectedImages={(images: any) => {
                setCover(images);
              }}
              open={galleryDialog.cover}
              setOpen={(open: boolean) =>
                setGalleryDialog({ ...galleryDialog, cover: open })
              }
              multiselect={false}
            />
          </>
        )}

        {galleryDialog.drawings && (
          <>
            <Gallery
              selectedImages={drawings}
              setSelectedImages={(images: any) => {
                setDrawings(images);
              }}
              open={galleryDialog.drawings}
              setOpen={(open: boolean) =>
                setGalleryDialog({ ...galleryDialog, drawings: open })
              }
              multiselect={true}
            />
          </>
        )}
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
