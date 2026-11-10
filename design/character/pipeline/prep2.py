import bpy, sys, math
S=sys.argv[1]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=S+'/char2/new.glb')
ms=[o for o in bpy.data.objects if o.type=='MESH']; arms=[o for o in bpy.data.objects if o.type=='ARMATURE']
print('meshes',[(m.name,len(m.data.polygons)) for m in ms],'arm',len(arms))
m=ms[0]
bpy.ops.object.select_all(action='DESELECT'); m.select_set(True); bpy.context.view_layer.objects.active=m
# bake current (rest) shape, drop the rig: Mixamo will rig it itself
for md in list(m.modifiers):
    if md.type=='ARMATURE': m.modifiers.remove(md)
mw=m.matrix_world.copy(); m.parent=None; m.matrix_world=mw
for a in arms: bpy.data.objects.remove(a, do_unlink=True)
for g in list(m.vertex_groups): m.vertex_groups.remove(g)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
d=m.modifiers.new('dec','DECIMATE'); d.ratio=min(1,60000/len(m.data.polygons)); bpy.ops.object.modifier_apply(modifier='dec'); bpy.ops.object.shade_smooth()
xs=[v.co.x for v in m.data.vertices]; ys=[v.co.y for v in m.data.vertices]; zs=[v.co.z for v in m.data.vertices]
h=max(zs)-min(zs); cx=(min(xs)+max(xs))/2; cy=(min(ys)+max(ys))/2; mz=min(zs)
for v in m.data.vertices: v.co.x-=cx; v.co.y-=cy; v.co.z-=mz
m.scale=(1.75/h,)*3; bpy.ops.object.transform_apply(scale=True)
print('dims', m.dimensions[:], 'tris', len(m.data.polygons))
for mt in bpy.data.materials:
    try: mt.surface_render_method='DITHERED'
    except Exception: pass
    if mt.use_nodes:
        for n in mt.node_tree.nodes:
            if n.type=='BSDF_PRINCIPLED':
                for nm,val in (('Alpha',1.0),('Metallic',0.0),('Roughness',0.8)):
                    i=n.inputs[nm]
                    for l in list(i.links): mt.node_tree.links.remove(l)
                    i.default_value=val
for img in bpy.data.images:
    if img.size[0]>1024: img.scale(1024,1024)
    if img.size[0]: img.filepath_raw=S+'/char2/'+img.name.replace('.','_')+'.png'; img.file_format='PNG'; img.save()
m.name='Gabriel'
bpy.ops.export_scene.fbx(filepath=S+'/char2/gabriel_v2_for_mixamo.fbx', use_selection=True, path_mode='COPY', embed_textures=True, axis_forward='-Z', axis_up='Y')
bpy.ops.export_scene.gltf(filepath=S+'/char2/clean.glb', use_selection=True, export_image_format='JPEG')
